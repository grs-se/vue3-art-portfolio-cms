<template>
	<div class="mx-auto p-2 xl:h-80 xl:w-auto">
		<figure
			class="flex flex-col rounded border border-solid border-brand-gray-2 hover:shadow-gray"
		>
			<!-- <figure
		class="m-2 flex h-full w-60 flex-col justify-center rounded border border-solid border-brand-gray-2 bg-white p-2 hover:shadow-gray"
	> -->
			<img
				:src="artwork.imageCover"
				class="items-center justify-center sm:max-h-60 xl:max-h-80"
				@mouseover="hover = true"
				@mouseleave="hover = false"
			/>
			<figcaption class="hidden bg-white">
				<h3>{{ artwork.title }}</h3>
				<!-- <span>{{ artwork.medium }}</span> -->
				<!-- <span>{{ artwork.date }}</span> -->
			</figcaption>
			<div
				v-if="hover === true"
				id="tooltip"
				class="absolute right-0 z-50 flex h-auto flex-col rounded-lg bg-black"
			>
				<figure class="w-100 m-2 flex flex-col hover:shadow-gray">
					<img
						:src="artwork.imageCover"
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
		</figure>
	</div>
</template>

<script lang="ts" setup>
import { computed, type PropType, ref } from "vue";

import type { Artwork } from "@/api/types";

import ArtworkCardHoverModal from "@/components/ArtworkResults/ArtworkCardHoverModal.vue";

const hover = ref<boolean>(false);

const props = defineProps({
	artwork: {
		type: Object as PropType<Artwork>,
		required: true,
	},
});
var tooltip = document.getElementById("tooltip-span");

const displayModalMousePosition = () => {
	window.onmousemove = function (e) {
		var x = e.clientX,
			y = e.clientY;
		tooltip.style.top = y + 20 + "px";
		tooltip.style.left = x + 20 + "px";
	};
};

const artworkPageLink = computed(() => `/artworks/results/${props.artwork.id}`);
</script>
