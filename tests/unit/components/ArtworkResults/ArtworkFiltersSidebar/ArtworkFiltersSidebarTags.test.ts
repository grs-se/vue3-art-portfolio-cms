import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";

import { useUserStore } from "@/stores/user";

import ArtworkFiltersSidebarTags from "@/components/ArtworkResults/ArtworkFiltersSidebar/ArtworkFiltersSidebarTags.vue";

describe("ArtworkFiltersSidebarTags", () => {
	const renderArtworkFiltersSidebarTags = () => {
		const pinia = createTestingPinia();
		const userStore = useUserStore();

		render(ArtworkFiltersSidebarTags, {
			global: {
				plugins: [pinia],
			},
		});

		return { userStore };
	};

	it("populates search input from store", async () => {
		const { userStore } = renderArtworkFiltersSidebarTags();
		userStore.tagsSearchTerm = "Painting";
		const input = await screen.findByRole<HTMLInputElement>("textbox");
		expect(input.value).toBe("Painting");
	});

	it("write user input to store", async () => {
		const { userStore } = renderArtworkFiltersSidebarTags();
		userStore.tagsSearchTerm = "";
		const input = screen.getByRole<HTMLInputElement>("textbox");
		await userEvent.type(input, "P");
		await userEvent.click(document.body);

		expect(userStore.UPDATE_TAGS_SEARCH_TERM).toHaveBeenCalledWith("P");
	});

	it("removes whitespace from user input", async () => {
		const { userStore } = renderArtworkFiltersSidebarTags();
		userStore.tagsSearchTerm = "";
		const input = screen.getByRole<HTMLInputElement>("textbox");
		await userEvent.type(input, "   Painting   ");
		await userEvent.click(document.body);

		expect(userStore.UPDATE_TAGS_SEARCH_TERM).toHaveBeenCalledWith("Painting");
	});
});
