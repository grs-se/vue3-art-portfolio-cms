import { createPinia, setActivePinia } from "pinia";

import { useUserStore } from "@/stores/user";
import { stringifyExpression } from "@vue/compiler-core";

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
		expect(store.selectedArtworkCategories).toEqual([]);
	});

	it("stores categories that the user would like to filter texts by", () => {
		const store = useUserStore();
		expect(store.selectedTextCategories).toEqual([]);
	});
});

describe("actions", () => {
	beforeEach(() => {
		setActivePinia(createPinia());
	});

	describe("LOGIN_USER", () => {
		it("logs the user in", () => {
			const store = useUserStore();
			store.LOGIN_USER();
			expect(store.isLoggedIn).toBe(true);
		});
	});

	describe("ADD_SELECTED_ARTWORK_CATEGORIES", () => {
		it("updates categories the user has chosen to filter artworks by", () => {
			const store = useUserStore();
			store.ADD_SELECTED_ARTWORK_CATEGORIES(["Cat1", "Cat2"]);
			expect(store.selectedArtworkCategories).toEqual(["Cat1", "Cat2"]);
		});
	});

	describe("ADD_SELECTED_TEXT_CATEGORIES", () => {
		it("updates categories the user has chosen to filter texts by", () => {
			const store = useUserStore();
			store.ADD_SELECTED_TEXT_CATEGORIES(["Cat1", "Cat2"]);
			expect(store.selectedTextCategories).toEqual(["Cat1", "Cat2"]);
		});
	});

	describe("CLEAR_USER_ARTWORK_FILTER_SELECTIONS", () => {
		it("removes all artwork filters that user has chosen", (_) => {
			const store = useUserStore();
			store.selectedArtworkCategories = ["Random category"];
			store.selectedArtworkLocations = ["Random location"];

			store.CLEAR_USER_ARTWORK_FILTER_SELECTIONS();

			expect(store.selectedArtworkCategories).toEqual([]);
			expect(store.selectedArtworkLocations).toEqual([]);
		});
	});
});
