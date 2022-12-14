import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";

import ArtworkFiltersSidebarCategories from "@/components/ArtworkResults/ArtworkFiltersSidebar/ArtworkFiltersSidebarCategories.vue";
import { useArtworksStore } from "@/stores/artworks";
import { useUserStore } from "@/stores/user";

describe("ArtworkFiltersSidebarCategories", () => {
	const renderArtworkFilterSidebarCategories = () => {
		const pinia = createTestingPinia();
		const artworksStore = useArtworksStore();
		const userStore = useUserStore();

		render(ArtworkFiltersSidebarCategories, {
			global: {
				plugins: [pinia],
				stubs: {
					FontAwesomeIcon: true,
				},
			},
		});

		return { artworksStore, userStore };
	};

	it("renders unique list of categories from artworks", async () => {
		const { artworksStore } = renderArtworkFilterSidebarCategories();
		artworksStore.UNIQUE_CATEGORIES = new Set(["London", "Whitechapel"]);

		const button = screen.getByRole("button", { name: /categories/i });
		await userEvent.click(button);

		const categoriesListItems = screen.getAllByRole("listitem");
		const categories = categoriesListItems.map((node) => node.textContent);
		expect(categories).toEqual(["London", "Whitechapel"]);
	});

	it("communicates that user has selected checkbox for categories", async () => {
		const { artworksStore, userStore } = renderArtworkFilterSidebarCategories();
		artworksStore.UNIQUE_CATEGORIES = new Set(["Painting", "Imagination"]);

		const button = screen.getByRole("button", { name: /categories/i });
		await userEvent.click(button);

		const checkbox = screen.getByRole("checkbox", {
			name: /painting/i,
		});
		await userEvent.click(checkbox);

		expect(userStore.ADD_SELECTED_CATEGORIES).toHaveBeenCalledWith([
			"Painting",
		]);
	});
});
