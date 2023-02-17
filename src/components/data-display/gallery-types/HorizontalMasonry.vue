<template>
	<artwork-cards class="repeat">
		<template #default="{ imageCover, title, medium, year }">
			<figure
				class="flex flex-col rounded border border-solid border-brand-gray-2 hover:shadow-gray"
			>
				<img
					:src="'public/images/artworks/' + imageCover"
					class="items-center justify-center sm:max-h-60 xl:max-h-80"
				/>
				<figcaption class="bg-white">
					<h3>{{ title }}</h3>
					<span>{{ medium }}</span>
					<span>{{ year }}</span>
				</figcaption>
			</figure>
		</template>
	</artwork-cards>
</template>

<script lang="ts" setup>
import { ArtworkCards } from "@/components/ArtworkResults/ArtworkGallery";

// props: {
// 	artwork: {
// 		type: Object,
// 		required: true,
// 	},
// },
// data() {
// return {
// 	flexWidth: (this.artwork.width.px * 220) / this.artwork.height.px,
// 	flexHeight: (this.artwork.height.px / this.artwork.width.px) * 100,
// 	imageCover: "public/images/artworks/" + this.artwork.imageCover,
// };
// },
</script>
