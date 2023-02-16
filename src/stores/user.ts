import { ref } from "vue";
import { defineStore } from "pinia";

import getUsers from "@/api/getUsers";
import type { User } from "@/api/types";

export const ADD_SELECTED_ARTWORK_CATEGORIES =
	"ADD_SELECTED_ARTWORK_CATEGORIES";
export const ADD_SELECTED_ARTWORK_LOCATIONS = "ADD_SELECTED_ARTWORK_LOCATIONS";
export const ADD_SELECTED_TEXT_CATEGORIES = "ADD_SELECTED_TEXT_CATEGORIES";
export const CLEAR_USER_ARTWORK_FILTER_SELECTIONS =
	"CLEAR_USER_ARTWORK_FILTER_SELECTIONS";

export const useUserStore = defineStore("user", () => {
	const users = ref<User[]>([]);
	const isLoggedIn = ref(false);
	const selectedArtworkCategories = ref<string[]>([]);
	const selectedArtworkLocations = ref<string[]>([]);
	const selectedTextCategories = ref<string[]>([]);
	const tagsSearchTerm = ref("");

	const FETCH_USERS = async () => {
		// isLoggedIn.value = true;
		const users = await getUsers();
		users.value = users;
	};

	const LOGIN_USER = async () => {
		isLoggedIn.value = true;
	};

	const ADD_SELECTED_ARTWORK_CATEGORIES = (categories: string[]) => {
		selectedArtworkCategories.value = categories;
	};

	const ADD_SELECTED_ARTWORK_LOCATIONS = (locations: string[]) => {
		selectedArtworkLocations.value = locations;
	};

	const ADD_SELECTED_TEXT_CATEGORIES = (categories: string[]) => {
		selectedTextCategories.value = categories;
	};

	const UPDATE_TAGS_SEARCH_TERM = (term: string) => {
		tagsSearchTerm.value = term;
	};

	const CLEAR_USER_ARTWORK_FILTER_SELECTIONS = () => {
		selectedArtworkCategories.value = [];
		selectedArtworkLocations.value = [];
		tagsSearchTerm.value = "";
	};

	return {
		users,
		isLoggedIn,
		selectedArtworkCategories,
		selectedArtworkLocations,
		selectedTextCategories,
		tagsSearchTerm,
		FETCH_USERS,
		LOGIN_USER,
		ADD_SELECTED_ARTWORK_CATEGORIES,
		ADD_SELECTED_ARTWORK_LOCATIONS,
		ADD_SELECTED_TEXT_CATEGORIES,
		UPDATE_TAGS_SEARCH_TERM,
		CLEAR_USER_ARTWORK_FILTER_SELECTIONS,
	};
});
