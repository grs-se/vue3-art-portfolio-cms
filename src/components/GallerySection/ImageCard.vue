<template>
  <figure
    v-for="imageLink in imageLinks"
    :key="imageLink.id"
    class="m-2 flex h-80 w-60 flex-col justify-center border border-solid p-2"
  >
    <img :src="imageLink" class="h-full w-auto items-center" />
    <figcaption class="">
      <span>Image Card</span>
    </figcaption>
  </figure>
</template>

<script>
export default {
  name: "ImageCard",
  data() {
    return {
      imageLinks: [
        "./public/images/angel-after-da-vinci.jpg",
        "./public/images/angel-after-da-vinci.jpg",
        "./public/images/angel-after-da-vinci.jpg",
      ],
    };
  },
};
</script>
