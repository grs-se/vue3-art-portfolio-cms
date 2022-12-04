<template>
  <figure
    v-for="imageLink in imageLinks"
    :key="imageLink.id"
    class="m-2 flex h-full w-60 flex-col justify-center border border-solid p-2"
  >
    <img :src="imageLink" class="h-auto w-auto items-center" />
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
        "./public/images/ascending-ladder.jpg",
        "./public/images/autumn-riverside-chalk-drawing.jpg",
      ],
    };
  },
};
</script>
