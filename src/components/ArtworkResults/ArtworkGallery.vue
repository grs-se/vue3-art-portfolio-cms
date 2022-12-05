<template>
	<section class="flex h-full w-full pt-16">
		<div id="gallery-wrapper" class="w-90 mx-auto flex h-full">
			<artwork-card />
		</div>
	</section>
</template>

<script>
import ArtworkCard from "@/components/ArtworkResults/ArtworkCard.vue";
export default {
	name: "ArtworkGallery",
	components: {
		ArtworkCard,
	},
};
</script>
