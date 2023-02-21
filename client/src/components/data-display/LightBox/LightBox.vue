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
import { type PropType } from "vue";

import type { Artwork } from "@/api/types";

defineProps({
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
</script>
