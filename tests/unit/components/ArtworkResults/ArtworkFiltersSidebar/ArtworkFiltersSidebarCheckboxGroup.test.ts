import type { Mock } from "vitest";
import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";

import { useRouter } from "vue-router";
vi.mock("vue-router");

import ArtworkFiltersSidebarCheckboxGroup from "@/components/ArtworkResults/ArtworkFiltersSidebar/ArtworkFiltersSidebarCheckboxGroup.vue";

const useRouterMock = useRouter as Mock;

describe("ArtworkFiltersSidebarCheckboxGroup", () => {
	interface ArtworkFiltersSidebarCheckboxGroupProps {
		header: string;
		uniqueValues: Set<string>;
		action: Mock;
	}

	const createProps = (
		props: Partial<ArtworkFiltersSidebarCheckboxGroupProps> = {}
	): ArtworkFiltersSidebarCheckboxGroupProps => ({
		header: "Some header",
		uniqueValues: new Set(["ValA", "ValB"]),
		action: vi.fn(),
		...props,
	});

	const renderArtworkFilterSidebarCheckboxGroup = (
		props: ArtworkFiltersSidebarCheckboxGroupProps
	) => {
		const pinia = createTestingPinia();

		render(ArtworkFiltersSidebarCheckboxGroup, {
			props: { ...props },
			global: {
				plugins: [pinia],
				stubs: {
					FontAwesomeIcon: true,
				},
			},
		});
	};

	it("renders unique list of values", async () => {
		const props = createProps({
			header: "Categories",
			uniqueValues: new Set(["Painting", "Studio"]),
		});
		renderArtworkFilterSidebarCheckboxGroup(props);

		const button = screen.getByRole("button", { name: /categories/i });
		await userEvent.click(button);

		const categoriesListItems = screen.getAllByRole("listitem");
		const categories = categoriesListItems.map((node) => node.textContent);
		expect(categories).toEqual(["Painting", "Studio"]);
	});

	describe("when user clicks checkbox", () => {
		it("communicates that user has selected checkbox for categories", async () => {
			useRouterMock.mockReturnValue({ push: vi.fn() });
			const action = vi.fn();
			const props = createProps({
				header: "Categories",
				uniqueValues: new Set(["Painting", "Studio"]),
				action,
			});
			renderArtworkFilterSidebarCheckboxGroup(props);

			const button = screen.getByRole("button", { name: /categories/i });
			await userEvent.click(button);

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
				header: "Categories",
				uniqueValues: new Set(["Painting"]),
			});
			renderArtworkFilterSidebarCheckboxGroup(props);
			const button = screen.getByRole("button", { name: /categories/i });
			await userEvent.click(button);

			const categoriesCheckbox = screen.getByRole("checkbox", {
				name: /painting/i,
			});
			await userEvent.click(categoriesCheckbox);

			expect(push).toHaveBeenCalledWith({ name: "ArtworkResults" });
		});
	});
});
