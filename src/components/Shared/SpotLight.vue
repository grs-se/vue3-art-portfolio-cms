<template>
	<ul>
		<li v-for="spotlight in displaySpotlights" :key="spotlight.id">
			<slot
				:image-cover="spotlight.imageCover"
				:title="spotlight.title"
				:description="spotlight.description"
				:medium="spotlight.medium"
				:categories="spotlight.categories"
			></slot>
		</li>
	</ul>
</template>

<script lang="ts" setup>
import { computed, onMounted } from "vue";

import { useArtworksStore } from "@/stores/artworks";

const artworksStore = useArtworksStore();
onMounted(artworksStore.FETCH_ARTWORKS);

const ARTWORK_SPOTLIGHTS = computed(() => artworksStore.ARTWORK_SPOTLIGHTS);

const displaySpotlights = computed(() => {
	return ARTWORK_SPOTLIGHTS.value;
});

// import { ref, onMounted } from "vue";
// import axios from "axios";

// const spotlights = ref([]);

// const getSpotlights = async () => {
// 	const baseUrl = import.meta.env.VITE_APP_API_URL;
// 	const url = `${baseUrl}/gallery`;
// 	const response = await axios.get(url);
// 	const artworks = response.data.data.artworks;
// 	const spotlights = artworks.filter(
// 		(artwork) => artwork.spotlight && artwork.spotlights === true
// 	);
// 	spotlights.value = response.data.data.artworks;
// };
// return state.artworks.filter(
// 	(artwork) => artwork.spotlight && artwork.spotlight === true
// );
</script>
