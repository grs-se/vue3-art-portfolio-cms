import { defineStore } from "pinia";
import createSet from "@/utils/createSet.js";

import getArtworks from "@/api/getArtworks";

import { useUserStore } from "@/stores/user";

export const FETCH_ARTWORKS = "FETCH_ARTWORKS";
export const UNIQUE_CATEGORIES = "UNIQUE_CATEGORIES";
export const FILTERED_ARTWORKS_BY_CATEGORIES =
	"FILTERED_ARTWORKS_BY_CATEGORIES";

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
		[FILTERED_ARTWORKS_BY_CATEGORIES](state) {
			const userStore = useUserStore();

			if (userStore.selectedCategories.length === 0) {
				return state.artworks;
			}
			console.log(userStore.selectedCategories);

			return state.artworks.filter((artwork) =>
				userStore.selectedCategories.includes(artwork.categories)
			);
		},
	},
});
