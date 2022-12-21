import { createPinia, setActivePinia } from "pinia";

import { useUserStore } from "@/stores/user";

describe("state", () => {
	beforeEach(() => {
		setActivePinia(createPinia());
	});

	it("keeps track of whether the user is logged in", () => {
		const store = useUserStore();
		expect(store.isLoggedIn).toBe(false);
	});

	it("stores categories that the user would like to filter artworks by", () => {
		const store = useUserStore();
		expect(store.selectedCategories).toEqual([]);
	});
});

describe("actions", () => {
	beforeEach(() => {
		setActivePinia(createPinia());
	});

	describe("loginUser", () => {
		it("logs the user in", () => {
			const store = useUserStore();
			store.loginUser();
			expect(store.isLoggedIn).toBe(true);
		});
	});

	describe("ADD_SELECTED_CATEGORIES", () => {
		it("updates categories the user has chosen to filter artworks by", () => {
			const store = useUserStore();
			store.ADD_SELECTED_CATEGORIES(["Cat1", "Cat2"]);
			expect(store.selectedCategories).toEqual(["Cat1", "Cat2"]);
		});
	});
});
