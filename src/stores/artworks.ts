import { defineStore } from "pinia";
import createSetFromNestedArray from "@/utils/createSetFromNestedArray.js";

import getArtworks from "@/api/getArtworks";

import { useUserStore } from "@/stores/user";
import type { Artwork } from "@/api/types";

export const FETCH_ARTWORKS = "FETCH_ARTWORKS";
export const UNIQUE_ARTWORK_CATEGORIES = "UNIQUE_ARTWORK_CATEGORIES";
export const UNIQUE_ARTWORK_LOCATIONS = "UNIQUE_ARTWORK_LOCATIONS";
export const FILTERED_ARTWORKS = "FILTERED_ARTWORKS";
export const ARTWORK_SPOTLIGHTS = "ARTWORK_SPOTLIGHTS";
export const ARTWORK_HERO = "ARTWORK_HERO";
export const INCLUDE_ARTWORK_BY_CATEGORY = "INCLUDE_ARTWORK_BY_CATEGORY";
export const INCLUDE_ARTWORK_BY_LOCATION = "INCLUDE_ARTWORK_BY_LOCATION";
export const INCLUDE_ARTWORK_BY_TAG = "INCLUDE_ARTWORK_BY_TAG";
export const SORT_ARTWORKS_BY_DATE = "SORT_ARTWORKS_BY_DATE";

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
		[UNIQUE_ARTWORK_CATEGORIES](state) {
			return createSetFromNestedArray(state.artworks, "categories");
		},
		[UNIQUE_ARTWORK_LOCATIONS](state) {
			return createSetFromNestedArray(state.artworks, "location");
		},
		[INCLUDE_ARTWORK_BY_CATEGORY]: () => (artwork: Artwork) => {
			const userStore = useUserStore();
			if (userStore.selectedArtworkCategories.length === 0) return true;
			return artwork.categories.some((cat) =>
				userStore.selectedArtworkCategories.includes(cat)
			);
		},
		[INCLUDE_ARTWORK_BY_LOCATION]: () => (artwork: Artwork) => {
			const userStore = useUserStore();
			if (userStore.selectedArtworkLocations.length === 0) return true;
			return artwork.location.some((loc: string) =>
				userStore.selectedArtworkLocations.includes(loc)
			);
		},
		[ARTWORK_SPOTLIGHTS](state) {
			return state.artworks.filter(
				(artwork) => artwork.spotlight && artwork.spotlight === true
			);
		},
		[ARTWORK_HERO](state) {
			return state.artworks.filter(
				(artwork: Artwork) => artwork.hero && artwork.hero === true
			);
		},
		[INCLUDE_ARTWORK_BY_TAG]: () => (artwork: Artwork) => {
			const userStore = useUserStore();
			if (userStore.tagsSearchTerm.length === 0) return true;
			return artwork.tags.some((tag: string) =>
				userStore.tagsSearchTerm.toLowerCase().includes(tag.toLowerCase())
			);
		},
		// [SORT_ARTWORKS_BY_DATE_ASCENDING](state) {},
		[FILTERED_ARTWORKS](state): Artwork[] {
			return state.artworks
				.filter((artwork) => this.INCLUDE_ARTWORK_BY_CATEGORY(artwork))
				.filter((artwork) => this.INCLUDE_ARTWORK_BY_LOCATION(artwork))
				.filter((artwork) => this.INCLUDE_ARTWORK_BY_TAG(artwork));
		},
	},
});
