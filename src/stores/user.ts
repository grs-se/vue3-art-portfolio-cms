import { defineStore } from "pinia";

export const ADD_SELECTED_ARTWORK_CATEGORIES =
	"ADD_SELECTED_ARTWORK_CATEGORIES";
export const ADD_SELECTED_ARTWORK_LOCATIONS = "ADD_SELECTED_ARTWORK_LOCATIONS";
export const ADD_SELECTED_TEXT_CATEGORIES = "ADD_SELECTED_TEXT_CATEGORIES";

export interface UserState {
	isLoggedIn: boolean;
	selectedArtworkCategories: string[];
	selectedArtworkLocations: string[];
	selectedTextCategories: string[];
}

export const useUserStore = defineStore("user", {
	state: (): UserState => ({
		isLoggedIn: false,
		selectedArtworkCategories: [],
		selectedArtworkLocations: [],
		selectedTextCategories: [],
	}),
	actions: {
		loginUser() {
			this.isLoggedIn = true;
		},
		[ADD_SELECTED_ARTWORK_CATEGORIES](categories: string[]) {
			this.selectedArtworkCategories = categories;
		},
		[ADD_SELECTED_ARTWORK_LOCATIONS](locations: string[]) {
			this.selectedArtworkLocations = locations;
		},
		[ADD_SELECTED_TEXT_CATEGORIES](categories: string[]) {
			this.selectedTextCategories = categories;
		},
	},
});
