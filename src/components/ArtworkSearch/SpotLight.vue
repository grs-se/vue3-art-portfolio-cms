<template>
	<ul>
		<li v-for="spotlight in displaySpotlights" :key="spotlight.id">
			<slot
				:image-cover="spotlight.imageCover"
				:title="spotlight.title"
				:description="spotlight.description"
				:medium="spotlight.medium"
			></slot>
		</li>
	</ul>
</template>

<script setup>
import { computed, onMounted } from "vue";

import { useArtworksStore } from "@/stores/artworks";

const artworksStore = useArtworksStore();
onMounted(artworksStore.FETCH_ARTWORKS);

const SPOTLIGHTS = computed(() => artworksStore.SPOTLIGHTS);

const displaySpotlights = computed(() => {
	return SPOTLIGHTS.value;
});
</script>
