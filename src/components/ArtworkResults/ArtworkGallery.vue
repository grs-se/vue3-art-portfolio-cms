<template>
	<main id="gallery-wrapper" class="w-4/5 gap-20 bg-brand-gray-2">
		<!-- <main id="gallery-wrapper" class="flex h-full w-full pt-16"> -->
		<div
			class="mx-auto mt-8 grid h-full w-2/3 gap-8 sm:w-5/6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
		>
			<!-- <div class="w-90 mx-auto flex h-full"> -->
			<artwork-card
				v-for="artwork in artworks"
				:key="artwork._id"
				:artwork="artwork"
			/>
		</div>
	</main>
</template>

<script>
// class="grid w-4/5 grid-cols-3 gap-20 bg-brand-gray-2"
import axios from "axios";
import ArtworkCard from "@/components/ArtworkResults/ArtworkCard.vue";
import { API_URL } from "@/config.js";

export default {
	name: "ArtworkGallery",
	components: {
		ArtworkCard,
	},
	data() {
		return {
			artworks: [],
		};
	},
	async mounted() {
		const response = await axios.get(API_URL + "gallery/");

		this.artworks = response.data.data.artworks;
		console.log(this.artworks);
	},
};
</script>
