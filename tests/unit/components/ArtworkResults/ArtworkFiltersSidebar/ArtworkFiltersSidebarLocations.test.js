import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";

import ArtworkFiltersSidebarLocations from "@/components/ArtworkResults/ArtworkFiltersSidebar/ArtworkFiltersSidebarLocations.vue";
import { useArtworksStore } from "@/stores/artworks";
import { useUserStore } from "@/stores/user";

describe("ArtworkFiltersSidebarLocations", () => {
	const renderArtworkFilterSidebarLocations = () => {
		const pinia = createTestingPinia();
		const artworksStore = useArtworksStore();
		const userStore = useUserStore();
		const $router = { push: vi.fn() };

		render(ArtworkFiltersSidebarLocations, {
			global: {
				mocks: {
					$router,
				},
				plugins: [pinia],
				stubs: {
					FontAwesomeIcon: true,
				},
			},
		});

		return { artworksStore, userStore, $router };
	};

	it("renders unique list of locations from artworks", async () => {
		const { artworksStore } = renderArtworkFilterSidebarLocations();
		artworksStore.UNIQUE_LOCATIONS = new Set(["London", "Whitechapel"]);

		const button = screen.getByRole("button", { name: /locations/i });
		await userEvent.click(button);

		const locationsListItems = screen.getAllByRole("listitem");
		const locations = locationsListItems.map((node) => node.textContent);
		expect(locations).toEqual(["London", "Whitechapel"]);
	});

	describe("when user clicks checkbox", () => {
		it("communicates that user has selected checkbox for locations", async () => {
			const { artworksStore, userStore } =
				renderArtworkFilterSidebarLocations();
			artworksStore.UNIQUE_LOCATIONS = new Set(["London", "Whitechapel"]);

			const button = screen.getByRole("button", { name: /locations/i });
			await userEvent.click(button);

			const locationsCheckbox = screen.getByRole("checkbox", {
				name: /london/i,
			});
			await userEvent.click(locationsCheckbox);

			expect(userStore.ADD_SELECTED_LOCATIONS).toHaveBeenCalledWith(["London"]);
		});
		it("navigates user to artwork results page to see fresh batch of filtered artworks", async () => {
			const { artworksStore, $router } = renderArtworkFilterSidebarLocations();
			artworksStore.UNIQUE_LOCATIONS = new Set(["London", "Brick-Lane"]);

			const button = screen.getByRole("button", { name: /location/i });
			await userEvent.click(button);

			const locationsCheckbox = screen.getByRole("checkbox", {
				name: /london/i,
			});
			await userEvent.click(locationsCheckbox);

			expect($router.push).toHaveBeenCalledWith({ name: "ArtworkResults" });
		});
	});
});
