<script lang="ts" setup>
import { ref } from "vue";
const imageLink = ref("users/avatar.png");
</script>

<template>
	<img
		:src="imageLink"
		class="h-8 w-8 rounded-3xl object-contain"
		alt="User profile image"
	/>
</template>
