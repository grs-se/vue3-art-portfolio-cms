<template>
	<artwork-filters-sidebar-checkbox-group
		:unique-values="UNIQUE_ARTWORK_CATEGORIES"
		:action="userStore.ADD_SELECTED_ARTWORK_CATEGORIES"
	/>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import ArtworkFiltersSidebarCheckboxGroup from "@/components/ArtworkResults/ArtworkFiltersSidebar/ArtworkFiltersSidebarCheckboxGroup.vue";

import { useArtworksStore } from "@/stores/artworks";
import { useUserStore } from "@/stores/user";

const artworksStore = useArtworksStore();
const UNIQUE_ARTWORK_CATEGORIES = computed(
	() => artworksStore.UNIQUE_ARTWORK_CATEGORIES
);

const userStore = useUserStore();
</script>
