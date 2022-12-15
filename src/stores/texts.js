import { defineStore } from "pinia";

import getTexts from "@/api/getTexts";

export const FETCH_TEXTS = "FETCH_TEXTS";
export const FETCH_ARTIST_STATEMENT = "FETCH_ARTIST_STATEMENT";
export const INCLUDE_ARTIST_STATEMENT = "INCLUDE_ARTIST_STATEMENT";

export const useTextsStore = defineStore("texts", {
	state: () => ({
		texts: [],
		artistStatement: {},
	}),
	actions: {
		async [FETCH_TEXTS]() {
			const texts = await getTexts();
			this.texts = texts;
		},
		async [FETCH_ARTIST_STATEMENT]() {
			const artistStatement = await getTexts("artist-statement");
			this.artistStatement = artistStatement;
		},
		getters: {
			[INCLUDE_ARTIST_STATEMENT](state) {
				return state.artistStatement;
			},
		},
	},
});
