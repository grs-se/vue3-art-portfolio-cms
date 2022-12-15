<template>
	<ul>
		<li v-for="artwork in FILTERED_ARTWORKS" :key="artwork._id">
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
import { mapActions, mapState } from "pinia";

import {
	useArtworksStore,
	FETCH_ARTWORKS,
	FILTERED_ARTWORKS,
} from "@/stores/artworks";

export default {
	name: "ArtworkCard",
	computed: {
		...mapState(useArtworksStore, {
			FILTERED_ARTWORKS,
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
