<template>
	<ul>
		<li v-for="artwork in artworks" :key="artwork._id">
			<slot
				:image-cover="artwork.imageCover"
				:title="artwork.title"
				:medium="artwork.medium"
				:dimensions="artwork.dimensions"
				:year="artwork.year"
			></slot>
		</li>
	</ul>
</template>

<script>
import axios from "axios";

export default {
	name: "ArtworkCard",
	data() {
		return {
			artworks: [],
		};
	},
	async mounted() {
		const baseUrl = import.meta.env.VITE_APP_API_URL;
		const url = `${baseUrl}/gallery`;
		const response = await axios.get(url);
		this.artworks = response.data.data.artworks;
	},
};
</script>
