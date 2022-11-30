<template>
  <section class="pt-16 flex w-full h-full">
    <div id="gallery-wrapper" class="w-full h-full">
      <image-card />
    </div>
  </section>
</template>

<script>
import ImageCard from "@/components/ImageCard.vue";
export default {
  name: "ImageGallery",
  components: {
    ImageCard,
  },
};
</script>
