<template>
	<main id="gallery-wrapper" class="flex-auto columns-3 bg-brand-gray-2 p-8">
		<div>
			<artwork-card
				v-for="artwork in artworks"
				:key="artwork._id"
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
