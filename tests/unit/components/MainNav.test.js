import { render, screen } from "@testing-library/vue";
// import userEvent from "@testing-library/user-event";
import { RouterLinkStub } from "@vue/test-utils";

import MainNav from "@/components/Navigation/MainNav.vue";

describe("MainNav", () => {
	const renderMainNav = () => {
		render(MainNav, {
			global: {
				stubs: {
					FontAwesomeIcon: true,
					RouterLink: RouterLinkStub,
				},
			},
		});
	};

	it("displays company name", () => {
		renderMainNav();
		const companyName = screen.getByText("George Rice-Smith");
		expect(companyName).toBeInTheDocument();
	});

	it("displays menu items for navigation", () => {
		renderMainNav();
		const navigationMenuItems = screen.getAllByRole("listitem");
		const navigationMenuTexts = navigationMenuItems.map(
			(item) => item.textContent
		);
		expect(navigationMenuTexts).toEqual([
			"Gallery",
			"Research",
			"Writing",
			"Exhibitions",
			"Statement",
			"About",
			"Contact",
		]);
	});
});
