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
		const $router = { push: vi.fn() };

		render(ArtworkFiltersSidebarCategories, {
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

	it("renders unique list of categories from artworks", async () => {
		const { artworksStore } = renderArtworkFilterSidebarCategories();
		artworksStore.UNIQUE_CATEGORIES = new Set(["London", "Whitechapel"]);

		const button = screen.getByRole("button", { name: /categories/i });
		await userEvent.click(button);

		const categoriesListItems = screen.getAllByRole("listitem");
		const categories = categoriesListItems.map((node) => node.textContent);
		expect(categories).toEqual(["London", "Whitechapel"]);
	});

	describe("when user clicks checkbox", () => {
		it("communicates that user has selected checkbox for categories", async () => {
			const { artworksStore, userStore } =
				renderArtworkFilterSidebarCategories();
			artworksStore.UNIQUE_CATEGORIES = new Set(["Painting", "Imagination"]);

			const button = screen.getByRole("button", { name: /categories/i });
			await userEvent.click(button);

			const categoriesCheckbox = screen.getByRole("checkbox", {
				name: /painting/i,
			});
			await userEvent.click(categoriesCheckbox);

			expect(userStore.ADD_SELECTED_CATEGORIES).toHaveBeenCalledWith([
				"Painting",
			]);
		});

		it("navigates user to artwork results page to see fresh batch of filtered artworks", async () => {
			const { artworksStore, $router } = renderArtworkFilterSidebarCategories();
			artworksStore.UNIQUE_CATEGORIES = new Set(["Painting", "Imagination"]);

			const button = screen.getByRole("button", { name: /categories/i });
			await userEvent.click(button);

			const categoriesCheckbox = screen.getByRole("checkbox", {
				name: /painting/i,
			});
			await userEvent.click(categoriesCheckbox);

			expect($router.push).toHaveBeenCalledWith({ name: "ArtworkResults" });
		});
	});
});
