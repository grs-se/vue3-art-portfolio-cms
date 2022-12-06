<template>
	<figure
		class="mx-auto h-auto w-auto rounded border border-solid border-brand-gray-2 bg-white p-2 hover:shadow-gray"
	>
		<!-- <figure
		class="m-2 flex h-full w-60 flex-col justify-center rounded border border-solid border-brand-gray-2 bg-white p-2 hover:shadow-gray"
	> -->
		<img :src="imageCover" class="items-center" />
		<figcaption class="">
			<h3>{{ artwork.title }}</h3>
			<!-- <span>{{ artwork.medium }}</span> -->
			<!-- <span>{{ artwork.date }}</span> -->
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
