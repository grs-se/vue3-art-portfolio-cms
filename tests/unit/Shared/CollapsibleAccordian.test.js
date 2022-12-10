import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";

import CollapsibleAccordian from "@/components/Shared/CollapsibleAccordian.vue";

describe("CollapsibleAccordian", () => {
	const renderCollapsibleAccordian = (config = {}) => {
		render(CollapsibleAccordian, {
			global: {
				stubs: {
					FontAwesomeIcon: true,
				},
			},
			props: {
				header: "My Category",
			},
			slots: {
				default: "<h3>My nested child</h3>",
			},
			...config,
		});
	};

	it("renders child content", async () => {
		const props = {
			header: "My Category",
		};
		const slots = {
			default: "<h3>My nested child</h3>",
		};
		const config = { props, slots };

		renderCollapsibleAccordian(config);

		expect(screen.queryByText("My nested child")).not.toBeInTheDocument();
		const button = screen.getByRole("button", { name: /my category/i });
		await userEvent.click(button);
		expect(screen.getByText("My nested child")).toBeInTheDocument();
	});

	describe("when parent does not provide custom child component", () => {
		it("renders default content", async () => {
			const props = {
				header: "My Category",
			};
			const slots = {};
			const config = { props, slots };

			renderCollapsibleAccordian(config);

			const button = screen.getByRole("button", { name: /my category/i });
			await userEvent.click(button);
			expect(
				screen.getByText("Whoops, somebody forgot to populate me!")
			).toBeInTheDocument();
		});
	});
});
