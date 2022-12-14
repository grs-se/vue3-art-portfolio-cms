import { defineStore } from "pinia";
import createSet from "@/utils/createSet.js";

import getArtworks from "@/api/getArtworks";

import { useUserStore } from "@/stores/user";

export const FETCH_ARTWORKS = "FETCH_ARTWORKS";
export const UNIQUE_CATEGORIES = "UNIQUE_CATEGORIES";
export const UNIQUE_LOCATIONS = "UNIQUE_LOCATIONS";
export const FILTERED_ARTWORKS = "FILTERED_ARTWORKS";
export const FILTERED_ARTWORKS_BY_CATEGORIES =
	"FILTERED_ARTWORKS_BY_CATEGORIES";
export const FILTERED_ARTWORKS_BY_LOCATIONS = "FILTERED_ARTWORKS_BY_LOCATIONS";

const INCLUDE_ARTWORK_BY_CATEGORY = "INCLUDE_ARTWORK_BY_CATEGORY";
const INCLUDE_ARTWORK_BY_LOCATION = "INCLUDE_ARTWORK_BY_LOCATION";

export const useArtworksStore = defineStore("artworks", {
	state: () => ({
		artworks: [],
	}),
	actions: {
		async [FETCH_ARTWORKS]() {
			const artworks = await getArtworks();
			this.artworks = artworks;
		},
	},
	getters: {
		[UNIQUE_CATEGORIES](state) {
			return createSet(state.artworks, "categories");
		},
		[UNIQUE_LOCATIONS](state) {
			return createSet(state.artworks, "location");
		},
		// Instead of getter returning value it returns function to enable custom parameters, not in 1st definition which is based on Pinia and will always be store state, if we want custom arguments to pass to getters the getter must return a function and in that function we can define whatever arguments we want
		[INCLUDE_ARTWORK_BY_CATEGORY]: () => (artwork) => {
			const userStore = useUserStore();
			if (userStore.selectedCategories.length === 0) return true;
			return artwork.categories.some((cat) =>
				userStore.selectedCategories.includes(cat)
			);
		},
		[INCLUDE_ARTWORK_BY_LOCATION]: () => (artwork) => {
			const userStore = useUserStore();
			if (userStore.selectedLocations.length === 0) return true;
			return artwork.location.some((loc) =>
				userStore.selectedLocations.includes(loc)
			);
		},
		[FILTERED_ARTWORKS_BY_CATEGORIES](state) {
			const userStore = useUserStore();

			if (userStore.selectedCategories.length === 0) {
				return state.artworks;
			}

			console.log(userStore.selectedCategories);
			// console.log(state.artworks.categories);

			return state.artworks.filter((artwork) =>
				artwork.categories.some((cat) =>
					userStore.selectedCategories.includes(cat)
				)
			);
		},
		[FILTERED_ARTWORKS_BY_LOCATIONS](state) {
			const userStore = useUserStore();

			if (userStore.selectedLocations.length === 0) {
				return state.artworks;
			}

			console.log(userStore.selectedLocations);
			// console.log(state.artworks.location);

			return state.artworks.filter((artwork) =>
				artwork.location.some((loc) =>
					userStore.selectedLocations.includes(loc)
				)
			);
		},
		[FILTERED_ARTWORKS](state) {
			return state.artworks
				.filter((artwork) => this.INCLUDE_ARTWORK_BY_CATEGORY(artwork))
				.filter((artwork) => this.INCLUDE_ARTWORK_BY_LOCATION(artwork));
		},
	},
});
