<template>
	<AdvancedImage :cld-img="myImg" />
</template>

<script setup>
import { AdvancedImage } from "@cloudinary/vue";
import { Cloudinary } from "@cloudinary/url-gen";

const props = defineProps({
	imageName: String,
});

const cld = new Cloudinary({
	cloud: {
		cloudName: "gallery",
	},
});

const myImg = cld.image(props.imageName);
</script>
