import type { Mock } from "vitest";
import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";

import { useRouter } from "vue-router";
vi.mock("vue-router");

import ArtworkSearchForm from "@/components/ArtworkSearch/ArtworkSearchForm.vue";

const useRouterMock = useRouter as Mock;

describe("ArtworkSearchForm", () => {
	describe("when user submits form", () => {
		it("directs user to Artwork results page with user's search parameters", async () => {
			const push = vi.fn();
			useRouterMock.mockReturnValue({ push });
			render(ArtworkSearchForm, {
				global: {
					stubs: {
						fontAwesomeIcon: true,
					},
				},
			});

			const categoryInput = screen.getByRole("textbox", {
				name: /category/i,
			});
			await userEvent.type(categoryInput, "Painting");

			// const locationInput = screen.getByRole("textbox", {
			// 	name: /where?/i,
			// });
			// await userEvent.type(locationInput, "London");

			const submitButton = screen.getByRole("button", {
				name: /search/i,
			});
			await userEvent.click(submitButton);

			expect(push).toHaveBeenCalledWith({
				name: "ArtworkResults",
				query: {
					category: "Painting",
					// location: "London",
				},
			});
		});
	});
});
