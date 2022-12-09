import { defineStore } from "pinia";

import getArtworks from "@/api/getArtworks";

export const FETCH_ARTWORKS = "FETCH_ARTWORKS";

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
});
