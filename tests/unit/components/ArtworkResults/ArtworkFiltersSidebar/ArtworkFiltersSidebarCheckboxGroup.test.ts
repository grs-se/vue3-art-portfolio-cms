import type { Mock } from "vitest";
import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";

import { useRouter } from "vue-router";
vi.mock("vue-router");

import ArtworkFiltersSidebarCheckboxGroup from "@/components/ArtworkResults/ArtworkFiltersSidebar/ArtworkFiltersSidebarCheckboxGroup.vue";

import { useUserStore } from "@/stores/user";

const useRouterMock = useRouter as Mock;

describe("ArtworkFiltersSidebarCheckboxGroup", () => {
	interface ArtworkFiltersSidebarCheckboxGroupProps {
		uniqueValues: Set<string>;
		action: Mock;
	}

	const createProps = (
		props: Partial<ArtworkFiltersSidebarCheckboxGroupProps> = {}
	): ArtworkFiltersSidebarCheckboxGroupProps => ({
		uniqueValues: new Set(["ValA", "ValB"]),
		action: vi.fn(),
		...props,
	});

	const renderArtworkFilterSidebarCheckboxGroup = (
		props: ArtworkFiltersSidebarCheckboxGroupProps
	) => {
		const pinia = createTestingPinia({ stubActions: false });
		const userStore = useUserStore();

		render(ArtworkFiltersSidebarCheckboxGroup, {
			props: { ...props },
			global: {
				plugins: [pinia],
			},
		});

		return { userStore };
	};

	it("renders unique list of values", () => {
		const props = createProps({
			uniqueValues: new Set(["Painting", "Studio"]),
		});
		renderArtworkFilterSidebarCheckboxGroup(props);

		const categoriesListItems = screen.getAllByRole("listitem");
		const categories = categoriesListItems.map((node) => node.textContent);
		expect(categories).toEqual(["Painting", "Studio"]);
	});

	describe("when user clicks checkbox", () => {
		it("communicates that user has selected checkbox for categories", async () => {
			useRouterMock.mockReturnValue({ push: vi.fn() });
			const action = vi.fn();
			const props = createProps({
				uniqueValues: new Set(["Painting", "Studio"]),
				action,
			});
			renderArtworkFilterSidebarCheckboxGroup(props);

			const categoriesCheckbox = screen.getByRole("checkbox", {
				name: /painting/i,
			});
			await userEvent.click(categoriesCheckbox);

			expect(action).toHaveBeenCalledWith(["Painting"]);
		});

		it("navigates user to artwork results page to see fresh batch of filtered artworks", async () => {
			const push = vi.fn();
			useRouterMock.mockReturnValue({ push });
			const props = createProps({
				uniqueValues: new Set(["Painting"]),
			});
			renderArtworkFilterSidebarCheckboxGroup(props);

			const paintingCheckbox = screen.getByRole("checkbox", {
				name: /painting/i,
			});
			await userEvent.click(paintingCheckbox);

			expect(push).toHaveBeenCalledWith({ name: "ArtworkResults" });
		});
	});

	describe("when user clears artwork filters", () => {
		it("unchecks any checked checkboxes", async () => {
			useRouterMock.mockReturnValue({ push: vi.fn() });
			const props = createProps({
				uniqueValues: new Set(["Painting"]),
			});
			const { userStore } = renderArtworkFilterSidebarCheckboxGroup(props);

			const paintingCheckboxBeforeAction = screen.getByRole<HTMLInputElement>(
				"checkbox",
				{
					name: /painting/i,
				}
			);
			await userEvent.click(paintingCheckboxBeforeAction);

			expect(paintingCheckboxBeforeAction.checked).toBe(true);

			userStore.CLEAR_USER_ARTWORK_FILTER_SELECTIONS();

			const paintingCheckboxAfterAction =
				await screen.findByRole<HTMLInputElement>("checkbox", {
					name: /painting/i,
				});
			expect(paintingCheckboxAfterAction.checked).toBe(false);
		});
	});
});
