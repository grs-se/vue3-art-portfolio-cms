<script lang="ts" setup>
import { computed, toRefs } from "vue";

const props = defineProps({
	text: {
		type: String,
		required: false,
		default: "",
	},
	btn: {
		type: String,
		required: false,
		default: "primary",
		validator(value: string) {
			return [
				"primary",
				"secondary",
				"tertiary",
				"alert-success",
				"alert-danger",
				"slideshow",
			].includes(value);
		},
	},
});

const { btn } = toRefs(props);

const buttonClass = computed(() => {
	return {
		[btn.value]: true,
	};
});
</script>

<template>
	<button :class="buttonClass">
		{{ text }}
		<slot></slot>
	</button>
</template>

<style scoped>
button {
	@apply px-5 py-3 font-medium;
}

.primary {
	/* @apply rounded bg-brand-gray-3 text-white hover:shadow-blue; */
	@apply rounded-md bg-brand-blue-1  font-medium
	text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800;
}

.secondary {
	@apply bg-transparent text-brand-blue-1 hover:bg-brand-blue-2 hover:text-white;
	/* @apply flex h-full bg-transparent text-brand-blue-1 hover:bg-brand-blue-2 hover:text-white; */
}

.tertiary {
	@apply rounded-sm bg-transparent px-4 py-2 text-brand-blue-1 hover:border hover:border-brand-blue-1;
	/* @apply flex h-full bg-transparent text-brand-blue-1 hover:bg-brand-blue-2 hover:text-white; */
}
.alert-danger {
	@apply flex h-5 w-5 items-center justify-center rounded-none border-1 border-red-500 bg-white px-1.5 text-3xl font-light text-red-500 hover:bg-red-300;
}

.alert-success {
	@apply bg-green-500 text-white;
}

.slide-show {
	@apply rounded-full bg-brand-gray-3;
}
</style>

<!-- <template>
	<button :class="buttonClass">{{ text }}</button>
</template> -->

<!-- <script lang="ts" setup>
import { computed, toRefs } from "vue";

const props = defineProps({
	text: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: false,
		default: "primary",
		validator(value: string) {
			return ["primary", "secondary"].includes(value);
		},
	},
});

const { type } = toRefs(props);

const buttonClass = computed(() => {
	return {
		[type.value]: true,
	};
});
</script>

<style scoped>
button {
	@apply px-5 py-3 font-medium;
}

.primary {
	/* @apply rounded bg-brand-gray-3 text-white hover:shadow-blue; */
	@apply rounded bg-brand-blue-1 text-white hover:shadow-blue;
}

.secondary {
	@apply bg-transparent text-brand-blue-1 hover:bg-brand-blue-2 hover:text-white;
	/* @apply flex h-full bg-transparent text-brand-blue-1 hover:bg-brand-blue-2 hover:text-white; */
}

.slideShow {
	@apply rounded-full bg-brand-gray-3;
}
</style> -->
