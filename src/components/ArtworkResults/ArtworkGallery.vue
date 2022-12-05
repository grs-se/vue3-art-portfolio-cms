<template>
	<main class="flex h-full w-full pt-16">
		<div id="gallery-wrapper" class="w-90 mx-auto flex h-full">
			<artwork-card
				v-for="artwork in artworks"
				:key="artwork.id"
				:artwork="artwork"
			/>
		</div>
	</main>
</template>

<script>
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
