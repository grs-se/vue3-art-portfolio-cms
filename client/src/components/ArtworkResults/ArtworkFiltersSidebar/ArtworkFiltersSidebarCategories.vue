<script lang="ts" setup>
import { computed } from "vue";
import ArtworkFiltersSidebarCheckboxGroup from "@/components/ArtworkResults/ArtworkFiltersSidebar/ArtworkFiltersSidebarCheckboxGroup.vue";

import { useArtworksStore } from "@/stores/artworks";
import { useUserMovementsStore } from "@/stores/userMovements";

const artworksStore = useArtworksStore();
const UNIQUE_ARTWORK_CATEGORIES = computed(
	() => artworksStore.UNIQUE_ARTWORK_CATEGORIES
);

const userMovementsStore = useUserMovementsStore();
</script>

<template>
	<artwork-filters-sidebar-checkbox-group
		class="capitalize"
		:unique-values="UNIQUE_ARTWORK_CATEGORIES"
		:action="userMovementsStore.ADD_SELECTED_ARTWORK_CATEGORIES"
	/>
</template>
