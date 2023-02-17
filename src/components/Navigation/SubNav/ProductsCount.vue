<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

import { useArtworksStore } from "@/stores";

const route = useRoute();
const onGalleryPage = computed(() => route.name === "gallery");

const artworksStore = useArtworksStore();
const filteredArtworks = computed(() => artworksStore.filteredArtworks);
</script>

<template>
	<div v-if="onGalleryPage">
		<font-awesome-icon :icon="['fas', 'search']" class="mr-3" />
		<span
			><span class="text-brand-green-1">{{ filteredArtworks.length }}</span>
			artworks matched</span
		>
	</div>
</template>
