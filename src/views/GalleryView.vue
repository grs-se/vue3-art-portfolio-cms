<template>
	<div class="">Gallery page for artwork {{ currentArtworkId }}</div>
</template>
<script>
export default {
	name: "GalleryView",
	computed: {
		currentArtworkId() {
			return this.$route.params.id;
		},
	},
};
</script>
