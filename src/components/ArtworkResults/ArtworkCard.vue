<template>
	<ul>
		<li
			v-for="artwork in FILTERED_ARTWORKS"
			:key="artwork._id"
			@hover="displayModalOnHover"
		>
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
import ArtworkCardHoverModal from "@/components/ArtworkResults/ArtworkCardHoverModal.vue";

import {
	useArtworksStore,
	FETCH_ARTWORKS,
	FILTERED_ARTWORKS,
} from "@/stores/artworks";

export default {
	name: "ArtworkCard",
	components: { ArtworkCardHoverModal },
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
		displayModalOnHover() {},
	},
};
</script>
