<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

import { useArtworksStore } from "@/stores";

const route = useRoute();
const onGalleryPage = computed(() => route.name === "gallery");

const artworksStore = useArtworksStore();
const FILTERED_ARTWORKS = computed(() => artworksStore.FILTERED_ARTWORKS);
</script>

<template>
	<div v-if="onGalleryPage">
		<font-awesome-icon :icon="['fas', 'search']" class="mr-3" />
		<span
			><span class="text-brand-green-1">{{ FILTERED_ARTWORKS.length }}</span>
			artworks matched</span
		>
	</div>
</template>
