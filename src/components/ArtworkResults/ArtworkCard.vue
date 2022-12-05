<template>
	<figure
		class="m-2 flex h-full w-60 flex-col justify-center border border-solid p-2"
	>
		<cld-image
			public-id="store/{{artworks.imageCover}}"
			class="h-auto w-auto items-center"
		></cld-image>
		<figcaption class="">
			<span>{{ artworks.title }}</span>
		</figcaption>
	</figure>
</template>

<script>
export default {
	name: "ArtworkCard",
	props: {
		artworks: {
			type: Object,
			required: true,
		},
	},
	computed: {
		artworkLink() {
			return `/artworks/${this.artworks.id}`;
		},
	},
};
</script>
