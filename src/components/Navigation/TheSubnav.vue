<template>
	<div class="h-16 w-full border-b border-solid border-brand-gray-1 bg-white">
		<div class="flex h-full items-center px-8">
			<div v-if="onArtworksResultsPage">
				<font-awesome-icon :icon="['fas', 'search']" class="mr-3" />
				<span
					><span class="text-brand-green-1">{{
						FILTERED_ARTWORKS.length
					}}</span>
					artworks matched</span
				>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from "pinia";

import { useArtworksStore, FILTERED_ARTWORKS } from "@/stores/artworks";

export default {
	name: "TheSubnav",
	computed: {
		...mapState(useArtworksStore, [FILTERED_ARTWORKS]),
		onArtworksResultsPage() {
			return this.$route.name === "ArtworkResults";
		},
	},
};
</script>
