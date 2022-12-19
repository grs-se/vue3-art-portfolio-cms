import { defineStore } from "pinia";

export const ADD_SELECTED_CATEGORIES = "ADD_SELECTED_CATEGORIES";
export const ADD_SELECTED_LOCATIONS = "ADD_SELECTED_LOCATIONS";

export interface UserState {
	isLoggedIn: boolean;
	selectedCategories: string[];
	selectedLocations: string[];
}

export const useUserStore = defineStore("user", {
	state: (): UserState => ({
		isLoggedIn: false,
		selectedCategories: [],
		selectedLocations: [],
	}),
	actions: {
		loginUser() {
			this.isLoggedIn = true;
		},
		[ADD_SELECTED_CATEGORIES](categories: string[]) {
			this.selectedCategories = categories;
		},
		[ADD_SELECTED_LOCATIONS](locations: string[]) {
			this.selectedLocations = locations;
		},
	},
});
