import type { Mock } from "vitest";
import { render, screen } from "@testing-library/vue";
import { RouterLinkStub } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { useRoute } from "vue-router";
vi.mock("vue-router");

import ArtworkGallery from "@/components/ArtworkResults/ArtworkGallery.vue";
import { useArtworksStore } from "@/stores/artworks";

const useRouteMock = useRoute as Mock;

describe("ArtworkGallery", () => {
	const renderArtworkGallery = () => {
		const pinia = createTestingPinia();
		const artworksStore = useArtworksStore();
		// @ts-expect-error
		artworksStore.FILTERED_ARTWORKS = Array(30).fill({});

		render(ArtworkGallery, {
			global: {
				plugins: [pinia],
				stubs: {
					RouterLink: RouterLinkStub,
				},
			},
		});

		return { artworksStore };
	};

	it("fetches artworks", () => {
		useRouteMock.mockReturnValue({ query: {} });

		const { artworksStore } = renderArtworkGallery();

		expect(artworksStore.FETCH_ARTWORKS).toHaveBeenCalled();
	});

	// it("displays maximum of 24 artworks", async () => {
	// 	useRouteMock.mockReturnValue({ query: { page: "1" } });

	// 	const { artworksStore } = renderArtworkGallery();
	// 	artworksStore.FILTERED_ARTWORKS = Array(30).fill({});

	// 	const artworkGallery = await screen.findAllByRole("figure");
	// 	expect(artworkGallery).toHaveLength(24);
	// });

	describe("when params exclude page number", () => {
		it("displays page number 1", () => {
			useRouteMock.mockReturnValue({ query: {} });

			renderArtworkGallery();

			expect(screen.getByText("Page 1")).toBeInTheDocument();
		});
	});

	describe("when params include page number", () => {
		it("displays page number", () => {
			useRouteMock.mockReturnValue({ query: { page: "3" } });

			renderArtworkGallery();

			expect(screen.getByText("Page 3")).toBeInTheDocument();
		});
	});

	describe("when user is on first page", () => {
		it("does not show link to previous page", async () => {
			useRouteMock.mockReturnValue({ query: { page: "1" } });

			const { artworksStore } = renderArtworkGallery();
			// @ts-expect-error
			artworksStore.FILTERED_ARTWORKS = Array(24).fill({});

			await screen.findAllByRole("figure");
			const previousLink = screen.queryByRole("link", { name: /previous/i });
			expect(previousLink).not.toBeInTheDocument();
		});

		it("shows link to next page", async () => {
			useRouteMock.mockReturnValue({ query: { page: "1" } });

			const { artworksStore } = renderArtworkGallery();
			// @ts-expect-error
			artworksStore.FILTERED_ARTWORKS = Array(30).fill({});

			await screen.findAllByRole("figure");
			const nextLink = screen.queryByRole("link", { name: /next/i });
			expect(nextLink).toBeInTheDocument();
		});
	});

	describe("when user is on last page", () => {
		it("does not show link to next page", async () => {
			useRouteMock.mockReturnValue({ query: { page: "2" } });

			const { artworksStore } = renderArtworkGallery();
			// @ts-expect-error
			artworksStore.FILTERED_ARTWORKS = Array(30).fill({});

			await screen.findAllByRole("figure");
			const nextLink = screen.queryByRole("link", { name: /next/i });
			expect(nextLink).not.toBeInTheDocument();
		});

		it("shows link to previous page", async () => {
			useRouteMock.mockReturnValue({ query: { page: "2" } });

			const { artworksStore } = renderArtworkGallery();
			// @ts-expect-error
			artworksStore.FILTERED_ARTWORKS = Array(30).fill({});

			await screen.findAllByRole("figure");
			const previousLink = screen.queryByRole("link", { name: /previous/i });
			expect(previousLink).toBeInTheDocument();
		});
	});
});
