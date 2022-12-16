import { render, screen } from "@testing-library/vue";
import { createTestingPinia } from "@pinia/testing";

import { useRoute } from "vue-router";
vi.mock("vue-router");

import TheSubnav from "@/components/Navigation/TheSubnav.vue";
import { useArtworksStore } from "@/stores/artworks";

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
			useRoute.mockReturnValue({ name: "ArtworkResults" });

			const { artworksStore } = renderTheSubnav();
			const numberOfArtworks = 16;
			artworksStore.FILTERED_ARTWORKS = Array(numberOfArtworks).fill({});

			const artworkCount = await screen.findByText(numberOfArtworks);
			expect(artworkCount).toBeInTheDocument();
		});
	});

	describe("when user is not on artworks page", () => {
		it("does NOT display artwork count", () => {
			useRoute.mockReturnValue({ name: "Home" });

			const { artworksStore } = renderTheSubnav();
			const numberOfArtworks = 16;
			artworksStore.FILTERED_ARTWORKS = Array(numberOfArtworks).fill({});

			const artworkCount = screen.queryByText(numberOfArtworks);
			expect(artworkCount).not.toBeInTheDocument();
		});
	});
});
