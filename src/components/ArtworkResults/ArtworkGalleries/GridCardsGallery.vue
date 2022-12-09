<template>
	<div
		data-gallery-mode="grid-cards"
		class="mx-auto grid rounded border border-solid bg-white p-4 sm:grid-cols-1 sm:gap-2 md:grid-cols-2 xl:max-w-gallery xl:grid-cols-3 xl:gap-10"
	>
		<!-- <div
			class="xl:max mx-auto grid sm:w-full sm:grid-cols-1 sm:gap-2 md:w-5/6 md:grid-cols-2 xl:max-w-gallery xl:grid-cols-3 xl:gap-10"
		> -->
		<!-- <div
			class="mx-auto mt-8 flex flex-row flex-wrap sm:w-full sm:grid-cols-1 sm:gap-2 md:w-5/6 md:grid-cols-2 xl:w-5/6 xl:grid-cols-3 xl:gap-8"
		> -->
		<!-- <div class="w-90 mx-auto flex h-full"> -->
		<!-- <horizontal-masonry-gallery -->
		<!-- <artwork-card
			v-for="artwork in displayedArtworks"
			:key="artwork._id"
			:artwork="artwork"
		/> -->
	</div>
</template>

<script>
// import ArtworkCard from "@/components/ArtworkResults/ArtworkCard.vue";

export default {
	name: "GridCardsGallery",
	components: {
		// ArtworkCard,
	},
	props: {
		artwork: {
			type: Object,
			required: true,
		},
	},
};
</script>
