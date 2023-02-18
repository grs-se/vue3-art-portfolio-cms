<script lang="ts" setup>
import { useArtworksStore } from "@/stores/artworks";
import { computed, onMounted } from "vue";
// import CloudImage from "@/components/CloudImage/CloudImage.vue";

const props = defineProps({
	imageCover: {
		type: String,
	},
	title: {
		type: String,
	},
	medium: {
		type: String,
	},
	dimensions: {
		type: String,
	},
	date: {
		type: String,
	},
});

const artworksStore = useArtworksStore();
onMounted(artworksStore.FETCH_ARTWORKS);

const FILTERED_ARTWORKS = computed(() => artworksStore.FILTERED_ARTWORKS);
</script>

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
