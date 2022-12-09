import { render, screen } from "@testing-library/vue";
import { RouterLinkStub } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";

import ArtworkGallery from "@/components/ArtworkResults/ArtworkGallery.vue";
import { useArtworksStore } from "@/stores/artworks";

describe("ArtworkGallery", () => {
	const createRoute = (queryParams = {}) => ({
		query: {
			page: "5",
			...queryParams,
		},
	});

	const renderArtworkGallery = ($route) => {
		const pinia = createTestingPinia();

		render(ArtworkGallery, {
			global: {
				plugins: [pinia],
				mocks: {
					$route,
				},
				stubs: {
					RouterLink: RouterLinkStub,
				},
			},
		});
	};

	it("fetches artworks", () => {
		const $route = createRoute();

		renderArtworkGallery($route);

		const artworksStore = useArtworksStore();
		expect(artworksStore.FETCH_ARTWORKS).toHaveBeenCalled();
	});

	it("displays maximum of 24 artworks", async () => {
		const queryParams = { page: "1" };
		const $route = createRoute(queryParams);

		renderArtworkGallery($route);
		const artworksStore = useArtworksStore();
		artworksStore.artworks = Array(30).fill({});

		const artworkGallery = await screen.findAllByRole("figure");
		expect(artworkGallery).toHaveLength(24);
	});

	describe("when params exclude page number", () => {
		it("displays page number 1", () => {
			const queryParams = { page: undefined };
			const $route = createRoute(queryParams);

			renderArtworkGallery($route);

			expect(screen.getByText("Page 1")).toBeInTheDocument();
		});
	});

	describe("when params include page number", () => {
		it("displays page number", () => {
			const queryParams = { page: "3" };
			const $route = createRoute(queryParams);

			renderArtworkGallery($route);

			expect(screen.getByText("Page 3")).toBeInTheDocument();
		});
	});

	describe("when user is on first page", () => {
		it("does not show link to previous page", async () => {
			const queryParams = { page: "1" };
			const $route = createRoute(queryParams);

			renderArtworkGallery($route);
			const artworksStore = useArtworksStore();
			artworksStore.artworks = Array(24).fill({});

			await screen.findAllByRole("figure");
			const previousLink = screen.queryByRole("link", { name: /previous/i });
			expect(previousLink).not.toBeInTheDocument();
		});

		it.only("shows link to next page", async () => {
			const queryParams = { page: "1" };
			const $route = createRoute(queryParams);

			renderArtworkGallery($route);
			const artworksStore = useArtworksStore();
			artworksStore.artworks = Array(30).fill({});

			await screen.findAllByRole("figure");
			const nextLink = screen.queryByRole("link", { name: /next/i });
			expect(nextLink).toBeInTheDocument();
		});
	});

	describe("when user is on last page", () => {
		it("does not show link to next page", async () => {
			const queryParams = { page: "2" };
			const $route = createRoute(queryParams);

			renderArtworkGallery($route);
			const artworksStore = useArtworksStore();
			artworksStore.artworks = Array(30).fill({});

			await screen.findAllByRole("figure");
			const nextLink = screen.queryByRole("link", { name: /next/i });
			expect(nextLink).not.toBeInTheDocument();
		});

		it("shows link to previous page", async () => {
			const queryParams = { page: "2" };
			const $route = createRoute(queryParams);

			renderArtworkGallery($route);
			const artworksStore = useArtworksStore();
			artworksStore.artworks = Array(30).fill({});

			await screen.findAllByRole("figure");
			const previousLink = screen.queryByRole("link", { name: /previous/i });
			expect(previousLink).toBeInTheDocument();
		});
	});
});
