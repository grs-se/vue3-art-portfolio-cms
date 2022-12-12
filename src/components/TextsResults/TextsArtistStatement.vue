<template>
	<section class="mx-auto flex h-full w-full flex-nowrap">
		<p class="text-sm font-light">{{}}</p>
	</section>
</template>

<script>
import { mapActions, mapState } from "pinia";

import { useTextsStore, FETCH_TEXTS } from "@/stores/texts";

export default {
	name: "TextsArtistStatement",
	// computed: {
	// 	...mapState(useTextsStore, FETCH_TEXTS),
	// },
	async mounted() {
		this.FETCH_ARTWORKS;
	},
	methods: {
		...mapActions(useTextsStore, [FETCH_TEXTS]),
	},
};
</script>
