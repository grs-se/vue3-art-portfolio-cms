<template>
	<div class="h-16 w-full border-b border-solid border-brand-gray-1 bg-white">
		<div class="flex h-full items-center px-8">
			<div v-if="onJobResultsPage">
				<font-awesome-icon :icon="['fas', 'search']" class="mr-3" />
				<span
					><span class="text-brand-green-1">{{
						FILTERED_ARTWORKS_BY_CATEGORIES.length
					}}</span>
					artworks matched</span
				>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from "pinia";

import {
	useArtworksStore,
	FILTERED_ARTWORKS_BY_CATEGORIES,
} from "@/stores/artworks";

export default {
	name: "TheSubnav",
	computed: {
		...mapState(useArtworksStore, [FILTERED_ARTWORKS_BY_CATEGORIES]),
		onJobResultsPage() {
			return this.$route.name === "ArtworkResults";
		},
	},
};
</script>
