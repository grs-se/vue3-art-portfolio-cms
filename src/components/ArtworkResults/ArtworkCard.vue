<template>
	<figure
		class="m-2 flex h-full w-60 flex-col justify-center border border-solid p-2"
	>
		<img src="{{artwork.imageCover}}" class="h-auto w-auto items-center" />
		<figcaption class="">
			<span>{{ artwork.title }}</span>
		</figcaption>
	</figure>
</template>

<script>
// public-id="store/{{artworks.imageCover}}"

export default {
	name: "ArtworkCard",
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
