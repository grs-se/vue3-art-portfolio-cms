<script lang="ts" setup>
import { ref } from "vue";
const siteTitle = ref("George Rice-Smith");
</script>

<template>
	<RouterLink
		:to="'/'"
		class="flex h-full items-center text-xl xs:ml-4 md:ml-0"
		>{{ siteTitle }}</RouterLink
	>
</template>
