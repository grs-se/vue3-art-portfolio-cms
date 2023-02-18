<template>
	<div
		class="mx-auto flex items-center justify-center p-2 xl:max-h-80 xl:w-auto"
	>
		<figure
			@mouseover="hover = true"
			@mouseleave="hover = false"
			class="flex h-auto flex-col items-center justify-center rounded border border-solid border-brand-gray-2 bg-white p-1 hover:shadow-gray"
		>
			<img
				:src="'images/' + artwork.imageCover"
				class="sm:max-h-auto items-center justify-center xl:max-h-80"
			/>
			<ArtworkModalHover :artwork="artwork" v-if="hover === true" />
		</figure>
	</div>
</template>

<script lang="ts" setup>
import { computed, type PropType, ref } from "vue";

import type { Artwork } from "@/api/types";

import { ArtworkModalHover } from "@/components/ArtworkResults/ArtworkGallery";

const hover = ref<boolean>(false);

const props = defineProps({
	artwork: {
		type: Object as PropType<Artwork>,
		required: true,
	},
});
// var tooltip = document.getElementById("tooltip-span");

// const displayModalMousePosition = () => {
// 	window.onmousemove = function (e) {
// 		var x = e.clientX,
// 			y = e.clientY;
// 		tooltip.style.top = y + 20 + "px";
// 		tooltip.style.left = x + 20 + "px";
// 	};
// };

const artworkPageLink = computed(() => `/artworks/results/${props.artwork.id}`);
</script>
