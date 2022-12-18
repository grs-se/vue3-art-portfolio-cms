<template>
	<div class=""></div>
	<the-hero />
	<!-- <blog-posts /> -->

	<!-- <artwork-gallery />
	<search-form /> -->
</template>

<script>
import TheHero from "@/components/ArtworkSearch/TheHero.vue";
import BlogPosts from "@/components/BlogPosts/BlogPosts.vue";

// import SpotLight from "@/components/ArtworkResults/ArtworkSearch/SpotLight.vue";
// import ArtworkGallery from "@/components/ArtworkResults/ArtworkGallery.vue";
// import SearchForm from "@/components/ArtworkSearch/SearchForm.vue";

export default {
	name: "HomeView",
	components: { TheHero, BlogPosts },
	// 	components: { ArtworkGallery, SearchForm },
};
</script>
