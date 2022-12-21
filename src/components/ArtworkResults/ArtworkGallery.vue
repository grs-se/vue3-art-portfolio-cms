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

<script lang="ts" setup>
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";

import GridCardsGallery from "@/components/ArtworkResults/ArtworkGalleries/GridCardsGallery.vue";
import { useArtworksStore } from "@/stores/artworks";

import usePreviousAndNextPages from "@/composables/usePreviousAndNextPages";

const artworksStore = useArtworksStore();
onMounted(artworksStore.FETCH_ARTWORKS);

const FILTERED_ARTWORKS = computed(() => artworksStore.FILTERED_ARTWORKS);

const route = useRoute();
const currentPage = computed(() =>
	Number.parseInt((route.query.page as string) || "1")
);
const maxPage = computed(() => Math.ceil(FILTERED_ARTWORKS.value.length / 24));

const { previousPage, nextPage } = usePreviousAndNextPages(
	currentPage,
	maxPage
);

const displayedArtworks = computed(() => {
	const pageNumber = currentPage.value;
	const firstArtworkIndex = (pageNumber - 1) * 24;
	const lastArtworkIndex = pageNumber * 24;
	return FILTERED_ARTWORKS.value.slice(firstArtworkIndex, lastArtworkIndex);
});
</script>
