<template>
	<div
		class="flex w-96 flex-col border-r border-solid border-brand-gray-1 bg-white p-4"
	>
		<section class="pb-5">
			<div class="flex flex-row justify-between">
				<h3 class="my-4 text-base">Gallery Options</h3>
				<div class="flex items-center text-sm">
					<action-button
						text="Clear Filters"
						type="secondary"
						@click="userStore.CLEAR_USER_ARTWORK_FILTER_SELECTIONS"
					/>
				</div>
			</div>

			<collapsible-accordian header="Categories">
				<artwork-filters-sidebar-checkbox-group
					:unique-values="UNIQUE_ARTWORK_CATEGORIES"
					:action="userStore.ADD_SELECTED_ARTWORK_CATEGORIES"
				/>
			</collapsible-accordian>

			<collapsible-accordian header="Locations">
				<artwork-filters-sidebar-checkbox-group
					:unique-values="UNIQUE_ARTWORK_LOCATIONS"
					:action="userStore.ADD_SELECTED_ARTWORK_LOCATIONS"
				/>
			</collapsible-accordian>
		</section>
	</div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

import ActionButton from "@/components/Shared/ActionButton.vue";
import CollapsibleAccordian from "@/components/Shared/CollapsibleAccordian.vue";
import ArtworkFiltersSidebarCheckboxGroup from "@/components/ArtworkResults/ArtworkFiltersSidebar/ArtworkFiltersSidebarCheckboxGroup.vue";

import { useArtworksStore } from "@/stores/artworks";
import { useUserStore } from "@/stores/user";

const artworksStore = useArtworksStore();
const UNIQUE_ARTWORK_CATEGORIES = computed(
	() => artworksStore.UNIQUE_ARTWORK_CATEGORIES
);
const UNIQUE_ARTWORK_LOCATIONS = computed(
	() => artworksStore.UNIQUE_ARTWORK_LOCATIONS
);

const userStore = useUserStore();
</script>
