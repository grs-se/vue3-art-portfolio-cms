<template>
	<ul>
		<li v-for="artwork in FILTERED_ARTWORKS" :key="artwork._id">
			<slot
				:image-cover="artwork.imageCover"
				:title="artwork.title"
				:medium="artwork.medium"
				:dimensions="artwork.dimensions"
				:year="artwork.year"
			></slot>
		</li>
	</ul>
</template>

<script setup>
import { useArtworksStore } from "@/stores/artworks";

import { computed, onMounted } from "vue";

const artworksStore = useArtworksStore();
onMounted(artworksStore.FETCH_ARTWORKS);

const FILTERED_ARTWORKS = computed(() => artworksStore.FILTERED_ARTWORKS);
</script>
