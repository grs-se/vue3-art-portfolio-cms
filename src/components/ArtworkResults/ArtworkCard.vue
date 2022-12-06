<template>
	<figure class="m-10 justify-center border border-solid p-2">
		<img :src="imageCover" class="h-auto w-auto items-center" />
		<figcaption class="">
			<h3>{{ artwork.title }}</h3>
			<span>{{ artwork.medium[0] }}</span>
			<span>{{ artwork.date }}</span>
		</figcaption>
	</figure>
</template>

<script>
export default {
	name: "ArtworkCard",
	props: {
		artwork: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			imageCover: "public/images/artworks/" + this.artwork.imageCover,
		};
	},
};
</script>
