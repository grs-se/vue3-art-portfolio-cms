import { ref } from "vue";
import { defineStore } from "pinia";

export const ADD_SELECTED_ARTWORK_CATEGORIES =
	"ADD_SELECTED_ARTWORK_CATEGORIES";
export const ADD_SELECTED_ARTWORK_LOCATIONS = "ADD_SELECTED_ARTWORK_LOCATIONS";
export const ADD_SELECTED_TEXT_CATEGORIES = "ADD_SELECTED_TEXT_CATEGORIES";
export const CLEAR_USER_ARTWORK_FILTER_SELECTIONS =
	"CLEAR_USER_ARTWORK_FILTER_SELECTIONS";

export const useUserMovementsStore = defineStore("userMovements", () => {
	const selectedArtworkCategories = ref<string[]>([]);
	const selectedArtworkLocations = ref<string[]>([]);
	const selectedTextCategories = ref<string[]>([]);
	const tagsSearchTerm = ref("");

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
		selectedArtworkCategories,
		selectedArtworkLocations,
		selectedTextCategories,
		tagsSearchTerm,
		ADD_SELECTED_ARTWORK_CATEGORIES,
		ADD_SELECTED_ARTWORK_LOCATIONS,
		ADD_SELECTED_TEXT_CATEGORIES,
		UPDATE_TAGS_SEARCH_TERM,
		CLEAR_USER_ARTWORK_FILTER_SELECTIONS,
	};
});
