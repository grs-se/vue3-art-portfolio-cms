<template>
	<div class="">Artwork View {{ currentArtworkId }}</div>
</template>
<script>
export default {
	name: "ArtworkView",
	computed: {
		currentArtworkId() {
			return this.$route.params.id;
		},
	},
};
</script>
