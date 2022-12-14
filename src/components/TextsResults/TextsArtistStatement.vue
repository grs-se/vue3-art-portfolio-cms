<template>
	<section class="mx-auto flex h-full w-full flex-nowrap">
		<div
			v-for="text in displayTexts"
			:key="text._id"
			:text="text"
			class="text-sm font-light"
		>
			<p>{{ text.title }}</p>
		</div>
	</section>
</template>

<script>
import { mapActions, mapState } from "pinia";

import { useTextsStore, FETCH_TEXTS } from "@/stores/texts";

export default {
	name: "TextsArtistStatement",
	computed: {
		...mapState(useTextsStore, {
			FETCH_TEXTS,
			displayTexts() {
				return this.FETCH_TEXTS;
			},
		}),
	},
	async mounted() {
		this.FETCH_ARTWORKS;
	},
	// methods: {
	// 	...mapActions(useTextsStore, [FETCH_TEXTS]),
	// },
};
</script>
