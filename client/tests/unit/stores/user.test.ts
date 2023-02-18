import { createPinia, setActivePinia } from "pinia";

import { useUserStore } from "@/stores/userMovements";
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

	it("stores user's search term for tags, themes, subjects, symbols, and categories", () => {
		const store = useUserStore();
		expect(store.tagsSearchTerm).toBe("");
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

	describe("UPDATE_TAGS_SEARCH_TERM", () => {
		it("receives search term for tags the user has entered", () => {
			const store = useUserStore();
			store.tagsSearchTerm = "";
			store.UPDATE_TAGS_SEARCH_TERM("Landscape");
			expect(store.tagsSearchTerm).toBe("Landscape");
		});
	});

	describe("CLEAR_USER_ARTWORK_FILTER_SELECTIONS", () => {
		it("removes all artwork filters that user has chosen", () => {
			const store = useUserStore();
			store.selectedArtworkCategories = ["Random category"];
			store.selectedArtworkLocations = ["Random location"];
			store.tagsSearchTerm = "Landscape";

			store.CLEAR_USER_ARTWORK_FILTER_SELECTIONS();

			expect(store.selectedArtworkCategories).toEqual([]);
			expect(store.selectedArtworkLocations).toEqual([]);
			expect(store.tagsSearchTerm).toBe("");
		});
	});
});
