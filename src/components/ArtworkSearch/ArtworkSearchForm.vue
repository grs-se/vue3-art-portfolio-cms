<template>
	<form
		class="flex h-12 w-full items-center justify-center rounded-3xl border border-solid border-brand-gray-3"
		@submit.prevent="searchForArtworks"
	>
		<font-awesome-icon :icon="['fas', 'search']" class="ml-4 mr-3" />

		<div class="flex h-full flex-1 flex-nowrap text-base font-light">
			<div class="relative flex h-full flex-1 items-center pr-3">
				<label for="category" class="absolute left-0 -top-10">Category</label>
				<text-input id="category" v-model="category" />
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
import { ref } from "vue";
import { useRouter } from "vue-router";

import ActionButton from "@/components/Shared/ActionButton.vue";
import TextInput from "@/components/Shared/TextInput.vue";

const category = ref("");

const router = useRouter();

const searchForArtworks = () => {
	router.push({
		name: "ArtworkResults",
		query: { category: category.value },
	});
};
</script>
