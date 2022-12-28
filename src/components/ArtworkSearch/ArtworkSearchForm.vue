<template>
	<form
		class="flex h-12 w-full items-center justify-center rounded-3xl border border-solid border-brand-gray-3"
		@submit.prevent="searchForArtworks"
	>
		<font-awesome-icon :icon="['fas', 'search']" class="ml-4 mr-3" />

		<div class="flex h-full flex-1 flex-nowrap text-base font-light">
			<div class="relative flex h-full flex-1 items-center pr-3">
				<!-- <label for="tag" class="absolute left-0 -top-10">Themes</label> -->
				<text-input id="tag" v-model="tag" :placeholder="searchTerm" />
			</div>
		</div>

		<action-button
			text="Search"
			type="secondary"
			class="flex items-center rounded-r-3xl"
		/>
	</form>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import nextElementInList from "@/utils/nextElementInList";

import { useRouter } from "vue-router";

import ActionButton from "@/components/Shared/ActionButton.vue";
import TextInput from "@/components/Shared/TextInput.vue";

const tag = ref("");

const router = useRouter();

const searchForArtworks = () => {
	router.push({
		name: "ArtworkResults",
		query: { tag: tag.value },
	});
};

const searchTerm = ref("Painting");
const interval = ref<ReturnType<typeof setInterval>>();

// const searchTermClasses = computed(() => {
// 	return {
// 		[searchTerm.value.toLowerCase()]: true,
// 	};
// });

const changeSearchTerm = () => {
	interval.value = setInterval(() => {
		const searchTerms = ["Painting", "Drawing", "Studio", "Archetype"];
		searchTerm.value = nextElementInList(searchTerms, searchTerm.value);
	}, 3000);
};
onMounted(changeSearchTerm);

onBeforeUnmount(() => {
	clearInterval(interval.value);
});
</script>
