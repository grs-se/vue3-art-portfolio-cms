import { defineStore } from "pinia";
import createSet from "@/utils/createSet.js";

import getTexts from "@/api/getTexts";

export const FETCH_TEXTS = "FETCH_TEXTS";

export const useTextsStore = defineStore("texts", {
	state: () => ({
		texts: [],
	}),
	actions: {
		async [FETCH_TEXTS]() {
			const texts = await getTexts();
			this.texts = texts;
		},
	},
});
