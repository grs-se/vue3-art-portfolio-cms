<template>
	<main id="gallery-wrapper" class="mx-auto w-full bg-brand-gray-2 p-8">
		<!-- class="mx-auto h-full w-full rounded border border-solid bg-white p-4" -->
		<grid-cards-gallery />
		<div class="mx-auto mt-8">
			<div class="flex flex-row flex-nowrap">
				<p class="flex-grow text-sm">Page {{ currentPage }}</p>

				<div class="flex items-center justify-center">
					<router-link
						v-if="previousPage"
						role="link"
						:to="{ name: 'ArtworkResults', query: { page: previousPage } }"
						class="mx-3 text-sm font-semibold text-brand-blue-1"
						>Previous</router-link
					>

					<router-link
						v-if="nextPage"
						role="link"
						:to="{ name: 'ArtworkResults', query: { page: nextPage } }"
						class="mx-3 text-sm font-semibold text-brand-blue-1"
						>Next</router-link
					>
				</div>
			</div>
		</div>
	</main>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";

import GridCardsGallery from "@/components/ArtworkResults/ArtworkGalleries/GridCardsGallery.vue";
import { useArtworksStore } from "@/stores/artworks";

const artworksStore = useArtworksStore();
onMounted(artworksStore.FETCH_ARTWORKS);

const route = useRoute();
const currentPage = computed(() => Number.parseInt(route.query.page || "1"));

const previousPage = computed(() => {
	const previousPage = currentPage.value - 1;
	const firstPage = 1;
	return previousPage >= firstPage ? previousPage : undefined;
});

const FILTERED_ARTWORKS = computed(() => artworksStore.FILTERED_ARTWORKS);

const nextPage = computed(() => {
	const nextPage = currentPage.value + 1;
	const maxPage = Math.ceil(FILTERED_ARTWORKS.value.length / 24);
	return nextPage <= maxPage ? nextPage : undefined;
});

const displayedArtworks = computed(() => {
	const pageNumber = currentPage.value;
	const firstArtworkIndex = (pageNumber - 1) * 24;
	const lastArtworkIndex = pageNumber * 24;
	return FILTERED_ARTWORKS.value.slice(firstArtworkIndex, lastArtworkIndex);
});

// export default {

// 	computed: {
// 		currentPage() {
// 			return Number.parseInt(this.$route.query.page || "1");
// 		},
// 		previousPage() {
// 			const previousPage = this.currentPage - 1;
// 			const firstPage = 1;
// 			return previousPage >= firstPage ? previousPage : undefined;
// 		},
// 		...mapState(useArtworksStore, {
// 			FILTERED_ARTWORKS,
// 			nextPage() {
// 				const nextPage = this.currentPage + 1;
// 				const maxPage = Math.ceil(this.FILTERED_ARTWORKS.length / 24);
// 				return nextPage <= maxPage ? nextPage : undefined;
// 			},
// 			displayedArtworks() {
// 				const pageNumber = this.currentPage;
// 				const firstArtworkIndex = (pageNumber - 1) * 24;
// 				const lastArtworkIndex = pageNumber * 24;
// 				return this.FILTERED_ARTWORKS.slice(
// 					firstArtworkIndex,
// 					lastArtworkIndex
// 				);
// 			},
// 		}),
// 	},
// 	async mounted() {
// 		this.FETCH_ARTWORKS();
// 	},
// 	methods: {
// 		...mapActions(useArtworksStore, [FETCH_ARTWORKS]),
// 	},
// };
</script>
