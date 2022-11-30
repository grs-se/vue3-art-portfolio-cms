<template>
  <main-nav />
  <image-gallery />
</template>

<script>
import MainNav from "@/components/MainNav.vue";
import ImageGallery from "@/components/ImageGallery.vue";

export default {
  name: "App",
  components: {
    MainNav,
    ImageGallery,
  },
};
</script>
