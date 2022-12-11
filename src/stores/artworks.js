import { defineStore } from "pinia";
import filterValues from "@/utils/filterValues.js";

import getArtworks from "@/api/getArtworks";

export const FETCH_ARTWORKS = "FETCH_ARTWORKS";
export const UNIQUE_CATEGORIES = "UNIQUE_CATEGORIES";

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
			return filterValues(state.artworks, "categories");
			// const categories = [];
			// state.artworks.forEach((artwork) => {
			// 	categories.push(...artwork.categories);
			// });
			// const uniqueCategories = [...new Set(categories)];
			// return uniqueCategories;
		},
	},
});
