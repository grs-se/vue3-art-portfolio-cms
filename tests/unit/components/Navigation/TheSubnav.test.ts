import type { Mock } from "vitest";
import { render, screen } from "@testing-library/vue";
import { createTestingPinia } from "@pinia/testing";

import { useRoute } from "vue-router";
vi.mock("vue-router");

import TheSubnav from "@/components/Navigation/TheSubnav.vue";
import { useArtworksStore } from "@/stores/artworks";

const useRouteMock = useRoute as Mock;

describe("TheSubnav", () => {
	const renderTheSubnav = () => {
		const pinia = createTestingPinia();
		const artworksStore = useArtworksStore();

		render(TheSubnav, {
			global: {
				plugins: [pinia],
				stubs: {
					FontAwesomeIcon: true,
				},
			},
		});

		return { artworksStore };
	};

	describe("when user is on gallery page", () => {
		it("displays artwork count", async () => {
			useRouteMock.mockReturnValue({ name: "ArtworkResults" });

			const { artworksStore } = renderTheSubnav();
			const numberOfArtworks = 16;
			// @ts-expect-error: Getter is read only
			artworksStore.FILTERED_ARTWORKS = Array(numberOfArtworks).fill({});

			const artworkCount = await screen.findByText(numberOfArtworks);
			expect(artworkCount).toBeInTheDocument();
		});
	});

	describe("when user is not on artworks page", () => {
		it("does NOT display artwork count", () => {
			useRouteMock.mockReturnValue({ name: "Home" });

			const { artworksStore } = renderTheSubnav();
			const numberOfArtworks = 16;
			// @ts-expect-error: Getter is read only
			artworksStore.FILTERED_ARTWORKS = Array(numberOfArtworks).fill({});

			const artworkCount = screen.queryByText(numberOfArtworks);
			expect(artworkCount).not.toBeInTheDocument();
		});
	});
});
