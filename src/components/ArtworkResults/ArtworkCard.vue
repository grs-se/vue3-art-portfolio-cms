<template>
	<figure
		class="m-2 flex h-full w-60 flex-col justify-center border border-solid p-2"
	>
		<img
			public-id="{{artwork.imageCover}}"
			src="{{artwork.imageCover}}"
			class="h-auto w-auto items-center"
		/>
		<figcaption class="">
			<h3>{{ artwork.title }}</h3>
			<span>{{ artwork.medium[0] }}</span>
			<span>{{ artwork.date }}</span>
		</figcaption>
	</figure>
</template>

<script>
// <cld-image
// 	public-id="store/{{artwork.imageCover}}"
// 	src="{{artwork.imageCover}}"
// 	class="h-auto w-auto items-center"
// ></cld-image>
// public-id="store/{{artworks.imageCover}}"

import { CldImage } from "cloudinary-vue";
export default {
	name: "ArtworkCard",
	components: CldImage,
	props: {
		artwork: {
			type: Object,
			required: true,
		},
	},
	// computed: {
	// 	artworkLink() {
	// 		return `/artworks/${this.artworks.id}`;
	// 	},
	// },
};
</script>
