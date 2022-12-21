<template>
	<div
		class="flex w-96 flex-col border-r border-solid border-brand-gray-1 bg-white p-4"
	>
		<section class="pb-5">
			<div class="flex flex-row justify-between">
				<h3 class="my-4 text-base">Gallery Options</h3>
				<div class="flex items-center text-sm">
					<action-button text="Clear Filters" type="secondary" />
				</div>
			</div>

			<artwork-filters-sidebar-checkbox-group
				header="Categories"
				:unique-values="UNIQUE_CATEGORIES"
				:action="userStore.ADD_SELECTED_CATEGORIES"
			/>
			<artwork-filters-sidebar-checkbox-group
				header="Locations"
				:unique-values="UNIQUE_LOCATIONS"
				:action="userStore.ADD_SELECTED_LOCATIONS"
			/>
		</section>
	</div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

import ActionButton from "@/components/Shared/ActionButton.vue";
import ArtworkFiltersSidebarCheckboxGroup from "@/components/ArtworkResults/ArtworkFiltersSidebar/ArtworkFiltersSidebarCheckboxGroup.vue";

import { useArtworksStore } from "@/stores/artworks";
import { useUserStore } from "@/stores/user";

const artworksStore = useArtworksStore();
const UNIQUE_CATEGORIES = computed(() => artworksStore.UNIQUE_CATEGORIES);
const UNIQUE_LOCATIONS = computed(() => artworksStore.UNIQUE_LOCATIONS);

const userStore = useUserStore();
</script>
