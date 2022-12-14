<template>
	<main id="gallery-wrapper" class="mx-auto mt-16 w-full bg-brand-gray-2 p-8">
		<ol
			data-gallery-mode="grid-cards"
			class="mx-auto grid rounded border border-solid bg-white p-4 sm:grid-cols-1 sm:gap-2 md:grid-cols-2 xl:max-w-gallery xl:grid-cols-3 xl:gap-10"
		>
			<artwork-card
				v-for="artwork in displayedArtworks"
				:key="artwork._id"
				:artwork="artwork"
			/>
		</ol>

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

<script>
import { mapActions, mapState } from "pinia";

import ArtworkCard from "@/components/ArtworkResults/ArtworkCard.vue";
// import HorizontalMasonryGallery from "@/components/ArtworkResults/ArtworkGalleries/HorizontalMasonryGallery.vue";
import {
	useArtworksStore,
	FETCH_ARTWORKS,
	// FILTERED_ARTWORKS_BY_CATEGORIES,
	FILTERED_ARTWORKS_BY_LOCATIONS,
} from "@/stores/artworks";

export default {
	name: "ArtworkGallery",
	components: {
		ArtworkCard,
		// HorizontalMasonryGallery,
	},
	computed: {
		currentPage() {
			return Number.parseInt(this.$route.query.page || "1");
		},
		previousPage() {
			const previousPage = this.currentPage - 1;
			const firstPage = 1;
			return previousPage >= firstPage ? previousPage : undefined;
		},
		...mapState(useArtworksStore, {
			FILTERED_ARTWORKS_BY_LOCATIONS,
			nextPage() {
				const nextPage = this.currentPage + 1;
				const maxPage = Math.ceil(
					this.FILTERED_ARTWORKS_BY_LOCATIONS.length / 24
				);
				return nextPage <= maxPage ? nextPage : undefined;
			},
			displayedArtworks() {
				const pageNumber = this.currentPage;
				const firstArtworkIndex = (pageNumber - 1) * 24;
				const lastArtworkIndex = pageNumber * 24;
				return this.FILTERED_ARTWORKS_BY_LOCATIONS.slice(
					firstArtworkIndex,
					lastArtworkIndex
				);
			},
		}),
	},
	async mounted() {
		this.FETCH_ARTWORKS();
	},
	methods: {
		...mapActions(useArtworksStore, [FETCH_ARTWORKS]),
	},
};
</script>
