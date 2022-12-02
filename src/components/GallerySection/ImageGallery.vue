<template>
  <section class="flex h-full w-full pt-16">
    <div id="gallery-wrapper" class="w-90 mx-auto flex h-full">
      <image-card />
    </div>
  </section>
</template>

<script>
import ImageCard from "@/components/GallerySection/ImageCard.vue";
export default {
  name: "ImageGallery",
  components: {
    ImageCard,
  },
};
</script>
