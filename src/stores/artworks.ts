import { defineStore } from "pinia";
import createSet from "@/utils/createSet.js";

import getArtworks from "@/api/getArtworks";

import { useUserStore } from "@/stores/user";
import type { Artwork } from "@/api/types";

export const FETCH_ARTWORKS = "FETCH_ARTWORKS";
export const UNIQUE_CATEGORIES = "UNIQUE_CATEGORIES";
export const UNIQUE_LOCATIONS = "UNIQUE_LOCATIONS";
export const FILTERED_ARTWORKS = "FILTERED_ARTWORKS";
export const SPOTLIGHTS = "SPOTLIGHTS";
export const HERO = "HERO";

const INCLUDE_ARTWORK_BY_CATEGORY = "INCLUDE_ARTWORK_BY_CATEGORY";
const INCLUDE_ARTWORK_BY_LOCATION = "INCLUDE_ARTWORK_BY_LOCATION";

export interface ArtworksState {
	artworks: Artwork[];
}

export const useArtworksStore = defineStore("artworks", {
	state: (): ArtworksState => ({
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
		[INCLUDE_ARTWORK_BY_CATEGORY]: () => (artwork: Artwork) => {
			const userStore = useUserStore();
			if (userStore.selectedCategories.length === 0) return true;
			return artwork.categories.some((cat) =>
				userStore.selectedCategories.includes(cat)
			);
		},
		[INCLUDE_ARTWORK_BY_LOCATION]: () => (artwork: Artwork) => {
			const userStore = useUserStore();
			if (userStore.selectedLocations.length === 0) return true;
			return artwork.location.some((loc: string) =>
				userStore.selectedLocations.includes(loc)
			);
		},
		[SPOTLIGHTS](state) {
			return state.artworks.filter(
				(artwork) => artwork.spotlight && artwork.spotlight === true
			);
		},
		[HERO](state) {
			return state.artworks.filter(
				(artwork: Artwork) => artwork.hero && artwork.hero === true
			);
		},
		[FILTERED_ARTWORKS](state): Artwork[] {
			return state.artworks
				.filter((artwork) => this.INCLUDE_ARTWORK_BY_CATEGORY(artwork))
				.filter((artwork) => this.INCLUDE_ARTWORK_BY_LOCATION(artwork));
		},
	},
});
