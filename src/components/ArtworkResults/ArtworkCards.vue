<template>
	<ol>
		<li v-for="artwork in FILTERED_ARTWORKS" :key="artwork._id" class="">
			<!-- <CloudImage image-name="artwork.imageCover" /> -->

			<slot
				:image-cover="artwork.imageCover"
				:title="artwork.title"
				:medium="artwork.medium"
				:dimensions="artwork.dimensions"
				:date="artwork.date"
			></slot>
		</li>
	</ol>
</template>

<script lang="ts" setup>
import { useArtworksStore } from "@/stores/artworks";
// import CloudImage from "@/components/CloudImage/CloudImage.vue";

import { computed, onMounted } from "vue";

const artworksStore = useArtworksStore();
onMounted(artworksStore.FETCH_ARTWORKS);

const FILTERED_ARTWORKS = computed(() => artworksStore.FILTERED_ARTWORKS);
</script>
