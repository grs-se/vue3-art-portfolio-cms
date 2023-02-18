import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";

import { useUserStore } from "@/stores/userMovements";

import ArtworkFiltersSidebarPrompt from "@/components/ArtworkResults/ArtworkFiltersSidebar/ArtworkFiltersSidebarPrompt.vue";

describe("ArtworkFiltersSidebarPrompt", () => {
	describe("when user clicks Clear Filters button", () => {
		it("sends message to clear all of user's artwork search filters", async () => {
			const pinia = createTestingPinia();
			const userStore = useUserStore();

			render(ArtworkFiltersSidebarPrompt, {
				global: {
					plugins: [pinia],
				},
			});

			const button = screen.getByRole("button", { name: /clear filters/i });
			await userEvent.click(button);

			expect(userStore.CLEAR_USER_ARTWORK_FILTER_SELECTIONS).toHaveBeenCalled();
		});
	});
});
