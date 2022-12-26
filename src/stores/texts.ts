import { defineStore } from "pinia";
import createSetFromNestedArray from "@/utils/createSetFromNestedArray.js";

import getTexts from "@/api/getTexts";

import { useUserStore } from "@/stores/user";
import type { Text } from "@/api/types";

export const FETCH_TEXTS = "FETCH_TEXTS";
export const UNIQUE_TEXT_CATEGORIES = "UNIQUE_TEXT_CATEGORIES";
export const INCLUDE_TEXT_BY_CATEGORY = "INCLUDE_TEXT_BY_CATEGORY";
export const FILTERED_TEXTS = "FILTERED_TEXTS";

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
	getters: {
		[UNIQUE_TEXT_CATEGORIES](state) {
			return createSetFromNestedArray(state.texts, "categories");
		},

		[INCLUDE_TEXT_BY_CATEGORY]: () => (text: Text) => {
			const userStore = useUserStore();
			if (userStore.selectedTextCategories.length === 0) return true;
			return text.categories.some((cat) =>
				userStore.selectedTextCategories.includes(cat)
			);
		},

		[FILTERED_TEXTS](state): Text[] {
			return state.texts.filter((text) => this.INCLUDE_TEXT_BY_CATEGORY(text));
		},
	},
});

// import { computed, ref } from "vue";
// import { defineStore } from "pinia";

// import { useUserStore } from "@/stores/user";

// import createSet from "@/utils/createSetFromNestedArray.js";

// import getTexts from "@/api/getTexts";
// import type { Text } from "@/api/types";

// export const useTextsStore = defineStore("texts", () => {
// 	const texts = ref<Text[]>([]);

// 	const FETCH_TEXTS = async () => {
// 		const receivedTexts = await getTexts();
// 		texts.value = receivedTexts;
// 	};

// 	const UNIQUE_TEXT_CATEGORIES = computed(() => {
// 		return createSet(texts.value, "categories");
// 	});

// 	const INCLUDE_TEXT_BY_CATEGORY = computed((text) => {
// 		const userStore = useUserStore();
// 		if (userStore.selectedTextCategories.length === 0) return true;
// 		return text.categories.some((cat: string) =>
// 			userStore.selectedTextCategories.includes(cat)
// 		);
// 	});

// 	const FILTERED_TEXTS = computed((texts) => {
// 		return texts.value.filter((text) => INCLUDE_TEXT_BY_CATEGORY(text));
// 	});

// 	return {
// 		texts,
// 		FETCH_TEXTS,
// 		UNIQUE_TEXT_CATEGORIES,
// 		INCLUDE_TEXT_BY_CATEGORY,
// 		FILTERED_TEXTS,
// 	};
// });
