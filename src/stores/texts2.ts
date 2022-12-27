import { computed, ref } from "vue";
import { defineStore } from "pinia";

import { useUserStore } from "@/stores/user";

import createSet from "@/utils/createSetFromNestedArray.js";

import getTexts from "@/api/getTexts";
import type { Text } from "@/api/types";

export const useTextsStore = defineStore("texts", () => {
	const texts = ref<Text[]>([]);

	const FETCH_TEXTS = async () => {
		const receivedTexts = await getTexts();
		texts.value = receivedTexts;
	};

	const UNIQUE_TEXT_CATEGORIES = computed(() => {
		return createSet(texts.value, "categories");
	});

	const INCLUDE_TEXT_BY_CATEGORY = computed(text: Text) => {
		const userStore = useUserStore();
		if (userStore.selectedTextCategories.length === 0) return true;
		return text.categories.some((cat: string) =>
			userStore.selectedTextCategories.includes(cat)
		);
	});

	const FILTERED_TEXTS = computed((texts) => {
		return texts.value.filter((text) => INCLUDE_TEXT_BY_CATEGORY(text));
	});

	return {
		texts,
		FETCH_TEXTS,
		UNIQUE_TEXT_CATEGORIES,
		INCLUDE_TEXT_BY_CATEGORY,
		FILTERED_TEXTS,
	};
});
