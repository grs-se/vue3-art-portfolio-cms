import { defineStore } from "pinia";

export const ADD_SELECTED_CATEGORIES = "ADD_SELECTED_CATEGORIES";
export const ADD_SELECTED_LOCATIONS = "ADD_SELECTED_LOCATIONS";

export const useUserStore = defineStore("user", {
	state: () => ({
		isLoggedIn: false,
		selectedCategories: [],
		selectedLocations: [],
	}),
	actions: {
		loginUser() {
			this.isLoggedIn = true;
		},
		[ADD_SELECTED_CATEGORIES](categories) {
			this.selectedCategories = categories;
		},
		[ADD_SELECTED_LOCATIONS](locations) {
			this.selectedLocations = locations;
		},
	},
});
