<script lang="ts" setup>
import { computed } from "vue";

import { useUserMovementsStore } from "@/stores/userMovements";

const userStore = useUserMovementsStore();

const tagsSearchTerm = computed({
	get() {
		return userStore.tagsSearchTerm;
	},
	set(value: string) {
		userStore.UPDATE_TAGS_SEARCH_TERM(value);
	},
});
// Two-way Data Binding: To avoid creating local component data, all connected to pinia, read data from pinia using get() and write data to pinia from template using set() invoking function on store, and this will happen every time the user types, and if the pinia store is updated somewhere else it recalculates every time the original source of data changes, update the UI because it is connected to the model.
//Reader and writer that is going to get and set data from another source, within Pinia store, advantage no longer two sources of truth, the primary and singular source of truth is now the pinia store.
</script>

<template>
	<div class="mt-2">
		<!-- lazy input modifier waits to run logic of v-model update until user is done typing: the less times you repaint and rerender your interface the quicker the application will be   -->
		<input
			v-model.lazy.trim="tagsSearchTerm"
			type="text"
			class="h-12 w-full rounded border border-solid border-brand-gray-1 p-3 text-base shadow-gray"
			placeholder="Landscape, Archetype, Sleeping figure"
		/>
	</div>
</template>
