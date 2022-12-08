<template>
	<main id="gallery-wrapper" class="mx-auto w-full bg-brand-gray-2 p-8">
		<!-- <main id="gallery-wrapper" class="flex h-full w-full pt-16"> -->
		<div
			class="mx-auto grid rounded border border-solid bg-white p-4 sm:grid-cols-1 sm:gap-2 md:grid-cols-2 xl:max-w-gallery xl:grid-cols-3 xl:gap-10"
		>
			<!-- <div
			class="xl:max mx-auto grid sm:w-full sm:grid-cols-1 sm:gap-2 md:w-5/6 md:grid-cols-2 xl:max-w-gallery xl:grid-cols-3 xl:gap-10"
		> -->
			<!-- <div
			class="mx-auto mt-8 flex flex-row flex-wrap sm:w-full sm:grid-cols-1 sm:gap-2 md:w-5/6 md:grid-cols-2 xl:w-5/6 xl:grid-cols-3 xl:gap-8"
		> -->
			<!-- <div class="w-90 mx-auto flex h-full"> -->
			<!-- <horizontal-masonry-gallery -->
			<artwork-card
				v-for="artwork in displayedArtworks"
				:key="artwork._id"
				:artwork="artwork"
			/>
		</div>
		<div class="mx-auto mt-8">
			<div class="flex flex-row flex-nowrap">
				<p class="flex-grow text-sm">Page {{ currentPage }}</p>

				<div class="flex items-center justify-center">
					<router-link
						v-if="previousPage"
						:to="{ name: 'ArtworkResults', query: { page: previousPage } }"
						class="mx-3 text-sm font-semibold text-brand-blue-1"
						>Previous</router-link
					>

					<router-link
						v-if="nextPage"
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
// class="grid w-4/5 grid-cols-3 gap-20 bg-brand-gray-2"
import axios from "axios";
import ArtworkCard from "@/components/ArtworkResults/ArtworkCard.vue";
// import HorizontalMasonryGallery from "@/components/ArtworkResults/ArtworkGalleries/HorizontalMasonryGallery.vue";

export default {
	name: "ArtworkGallery",
	components: {
		ArtworkCard,
		// HorizontalMasonryGallery,
	},
	data() {
		return {
			artworks: [],
			artworksPerPage: 24,
		};
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
		nextPage() {
			const nextPage = this.currentPage + 1;
			const maxPage = this.artworks.length / this.artworksPerPage;
			return nextPage <= maxPage ? nextPage : undefined;
		},
		displayedArtworks() {
			const pageNumber = this.currentPage;
			const firstArtworkIndex = (pageNumber - 1) * this.artworksPerPage;
			const lastArtworkIndex = pageNumber * this.artworksPerPage;
			return this.artworks.slice(firstArtworkIndex, lastArtworkIndex);
		},
	},
	async mounted() {
		const baseUrl = import.meta.env.VITE_APP_API_URL;
		const response = await axios.get(`${baseUrl}/gallery`);

		this.artworks = response.data.data.artworks;
		console.log(this.artworks);
	},
};
</script>
