<script lang="ts" setup>
import { computed, ref, onBeforeUnmount, onMounted } from "vue";

import nextElementInList from "@/utils/nextElementInList";

const action = ref("Build");
const interval = ref<ReturnType<typeof setInterval>>();

const actionClasses = computed(() => {
	return {
		[action.value.toLowerCase()]: true,
	};
});

const changeTitle = () => {
	interval.value = setInterval(() => {
		const actions = ["Artist", "Web-Developer", "Landscaping"];
		action.value = nextElementInList(actions, action.value);
	}, 3000);
};
onMounted(changeTitle);
onBeforeUnmount(() => {
	clearInterval(interval.value);
});
</script>

<template>
	<section class="mb-24">
		<h1 class="hero-header mb-10 font-normal">
			<span>George Rice-Smith</span>
			<br />
			<!-- <span :class="actionClasses">{{ action }}</span> -->
		</h1>
		<h2 class="text-3xl font-light">Artist based in London, UK</h2>
	</section>
</template>

<style scoped>
.hero-header {
	font-size: 2.8rem;
}
.artist {
	color: #1a73e8;
}

.web-developer {
	color: #34a853;
}

.landscaping {
	color: #f9ab00;
}

.build {
	color: #d93025;
}
</style>
