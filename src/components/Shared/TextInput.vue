<template>
	<input
		type="text"
		:value="modelValue"
		class="text-md h-full w-full font-normal focus:outline-none"
		:placeholder="placeholder"
		@input="handleInput"
	/>
</template>

<script lang="ts" setup>
// import { ref } from "vue";
// import nextElementInList from "@/utils/nextElementInList";

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

// export default {
// 	data() {
// 		return {
// 			value: "",
// 			placeholder: "Painting",
// 			interval: null,
// 		};
// 	},
// 	created() {
// 		this.changePlaceholder();
// 	},
// 	beforeUnmount() {
// 		clearInterval(this.interval);
// 	},
// 	methods: {
// 		changePlaceholder() {
// 			this.interval = setInterval(() => {
// 				const placeholders = ["Painting", "Winchester", "2022", "Imagination"];
// 				this.placeholder = nextElementInList(placeholders, this.placeholder);
// 			}, 3000);
// 		},
// 		handleInput($event: Event) {
// 			const target = $event.target as HTMLInputElement;
// 			this.$emit("update:modelValue", target.value);
// 		},
// 	},
// };
</script>
