<template>
	<div class="repeat">
		<figure
			class="flex flex-col rounded border border-solid border-brand-gray-2 hover:shadow-gray"
		>
			<!-- <figure
		class="m-2 flex h-full w-60 flex-col justify-center rounded border border-solid border-brand-gray-2 bg-white p-2 hover:shadow-gray"
	> -->
			<img
				:src="imageCover"
				class="items-center justify-center sm:max-h-60 xl:max-h-80"
			/>
			<figcaption class="bg-white">
				<h3>{{ artwork.title }}</h3>
				<!-- <span>{{ artwork.medium }}</span> -->
				<!-- <span>{{ artwork.date }}</span> -->
			</figcaption>
		</figure>
	</div>
</template>

<script>
export default {
	name: "HorizontalMasonryGallery",
	props: {
		artwork: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			flexWidth: (this.artwork.width.px * 220) / this.artwork.height.px,
			flexHeight: (this.artwork.height.px / this.artwork.width.px) * 100,
			imageCover: "public/images/artworks/" + this.artwork.imageCover,
		};
	},
};
</script>

<style scoped>
.repeat {
	/* width: this.flexWidth; */
}
</style>
