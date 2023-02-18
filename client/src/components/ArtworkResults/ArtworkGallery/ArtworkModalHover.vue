<template>
	<div
		id="tooltip"
		class="absolute right-0 z-50 flex h-auto flex-col rounded-lg bg-black"
	>
		<figure class="w-100 m-2 flex flex-col hover:shadow-gray">
			<img
				:src="'images/' + artwork.imageCover"
				class="items-center justify-center sm:max-h-80 xl:max-h-80"
			/>
			<figcaption class="flex flex-col text-white">
				<h3>{{ artwork.title }}</h3>
				<div class="flex flex-col text-base">
					<span>{{ artwork.medium }}</span>
					<span>{{ artwork.date.toLocaleString() }}</span>
				</div>
			</figcaption>
		</figure>
	</div>
</template>

<script lang="ts" setup>
import { computed, type PropType, ref } from "vue";

import type { Artwork } from "@/api/types";

// import { ArtworkModalHover } from "@/components/ArtworkResults/ArtworkGallery";

// const hover = ref<boolean>(false);

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

// const artworkPageLink = computed(() => `/artworks/results/${props.artwork.id}`);
</script>

<!-- <template>
	<artwork-cards>
		<template #default="{ imageCover, title }">
			<section class="max-w-80 flex max-h-80 flex-col bg-white">
				<figure>
					<img :src="imageCover" alt="" class="h-60 w-auto" />
				</figure>
				<figcaption class="hidden bg-white">
					<h3>{{ title }}</h3>
				</figcaption>
			</section>
		</template>
	</artwork-cards>
</template>

<script lang="ts" setup>
import { ArtworkCards } from "@/components/ArtworkResults/ArtworkGallery";
</script> -->
