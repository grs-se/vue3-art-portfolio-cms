import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";

import ArtworkFiltersSidebarCategories from "@/components/ArtworkResults/ArtworkFiltersSidebar/ArtworkFiltersSidebarCategories.vue";
import { useArtworksStore } from "@/stores/artworks";

describe("ArtworkFiltersSidebarCategories", () => {
	it("renders unique list of categories from artworks", async () => {
		const pinia = createTestingPinia();
		const artworksStore = useArtworksStore();
		artworksStore.UNIQUE_CATEGORIES = new Set(["Painting", "Studio"]);

		render(ArtworkFiltersSidebarCategories, {
			global: {
				plugins: [pinia],
				stubs: {
					FontAwesomeIcon: true,
				},
			},
		});

		const button = screen.getByRole("button", { name: /categories/i });
		await userEvent.click(button);

		const categoryListItems = screen.getAllByRole("listitem");
		const categories = categoryListItems.map((node) => node.textContent);
		expect(categories).toEqual(["Painting", "Studio"]);
	});
});
