import { render, screen } from "@testing-library/vue";
import { createTestingPinia } from "@pinia/testing";

import TheSubnav from "@/components/Navigation/TheSubnav.vue";
import { useArtworksStore } from "@/stores/artworks";

describe("TheSubnav", () => {
	const renderTheSubnav = (routeName) => {
		const pinia = createTestingPinia();
		const artworksStore = useArtworksStore();

		render(TheSubnav, {
			global: {
				plugins: [pinia],
				mocks: {
					$route: {
						name: routeName,
					},
				},
				stubs: {
					FontAwesomeIcon: true,
				},
			},
		});

		return { artworksStore };
	};

	describe("when user is on gallery page", () => {
		it("displays artwork count", async () => {
			const routeName = "ArtworkResults";

			const { artworksStore } = renderTheSubnav(routeName);
			const numberOfArtworks = 16;
			artworksStore.FILTERED_ARTWORKS = Array(numberOfArtworks).fill({});

			const artworkCount = await screen.findByText(numberOfArtworks);
			expect(artworkCount).toBeInTheDocument();
		});
	});

	describe("when user is not on artworks page", () => {
		it("does NOT display artwork count", () => {
			const routeName = "Home";

			const { artworksStore } = renderTheSubnav(routeName);
			const numberOfArtworks = 16;
			artworksStore.FILTERED_ARTWORKS = Array(numberOfArtworks).fill({});

			const artworkCount = screen.queryByText(numberOfArtworks);
			expect(artworkCount).not.toBeInTheDocument();
		});
	});
});
