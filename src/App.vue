<template>
  <main-nav />
  <image-gallery />
  <search-form />
</template>

<script>
import MainNav from "@/components/Navigation/MainNav.vue";
import ImageGallery from "@/components/GallerySection/ImageGallery.vue";
import SearchForm from "@/components/GallerySection/SearchForm.vue";

export default {
  name: "App",
  components: {
    MainNav,
    ImageGallery,
    SearchForm,
  },
};
</script>
