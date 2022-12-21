import { defineStore } from "pinia";

import getTexts from "@/api/getTexts";

import type { Text } from "@/api/types";

export const FETCH_TEXTS = "FETCH_TEXTS";

export interface TextsState {
	texts: Text[];
}

export const useTextsStore = defineStore("texts", {
	state: (): TextsState => ({
		texts: [],
	}),
	actions: {
		async [FETCH_TEXTS]() {
			const texts = await getTexts();
			this.texts = texts;
		},
	},
});
