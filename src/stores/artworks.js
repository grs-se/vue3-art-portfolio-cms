import { defineStore } from "pinia";
import createSet from "@/utils/createSet.js";

import getArtworks from "@/api/getArtworks";

import { useUserStore } from "@/stores/user";

export const FETCH_ARTWORKS = "FETCH_ARTWORKS";
export const UNIQUE_CATEGORIES = "UNIQUE_CATEGORIES";
export const UNIQUE_LOCATIONS = "UNIQUE_LOCATIONS";
export const FILTERED_ARTWORKS_BY_CATEGORIES =
	"FILTERED_ARTWORKS_BY_CATEGORIES";
export const FILTERED_ARTWORKS_BY_LOCATIONS = "FILTERED_ARTWORKS_BY_LOCATIONS";

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
	},
});
