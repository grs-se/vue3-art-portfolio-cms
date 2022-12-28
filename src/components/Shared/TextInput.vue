<template>
	<input
		type="text"
		:value="modelValue"
		class="text-md h-full w-full font-normal focus:outline-none"
		@input="handleInput"
	/>
</template>

<script lang="ts" setup>
// const data = ref({ value: "", placeholder: "Painting", interval: null });

defineProps({
	modelValue: {
		type: String,
		required: true,
	},
});

const emit = defineEmits(["update:modelValue"]);

const handleInput = ($event: Event) => {
	const target = $event.target as HTMLInputElement;
	emit("update:modelValue", target.value);
};
</script>
