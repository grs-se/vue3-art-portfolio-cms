<template>
	<section class="mb-16">
		<h1 class="mb-14 text-8xl font-bold tracking-tighter">
			<span>Art Portfolio</span>
			<!-- <span :class="actionClasses">{{ action }}</span> -->
			<br />
		</h1>
		<h2 class="text-3xl font-light">Based in London, UK</h2>
	</section>
</template>

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
		const actions = ["Artist", "Programmer", "Landscaping"];
		action.value = nextElementInList(actions, action.value);
	}, 3000);
};
onMounted(changeTitle);
onBeforeUnmount(() => {
	clearInterval(interval.value);
});
</script>

<style scoped>
.artist {
	color: #1a73e8;
}

.programmer {
	color: #34a853;
}

.landscaping {
	color: #f9ab00;
}

.build {
	color: #d93025;
}
</style>
