<template>
	<input
		type="text"
		:value="modelValue"
		class="text-md h-full w-full font-normal focus:outline-none"
		:placeholder="placeholder"
		@input="handleInput"
	/>
</template>

<script>
import nextElementInList from "@/utils/nextElementInList";

export default {
	name: "TextInput",
	props: {
		modelValue: {
			type: String,
			required: true,
		},
	},
	emits: ["update:modelValue"],
	data() {
		return {
			value: "",
			placeholder: "Painting",
			interval: null,
		};
	},
	created() {
		this.changePlaceholder();
	},
	beforeUnmount() {
		clearInterval(this.interval);
	},
	methods: {
		changePlaceholder() {
			this.interval = setInterval(() => {
				const placeholders = ["Painting", "Winchester", "2022", "Imagination"];
				this.placeholder = nextElementInList(placeholders, this.placeholder);
			}, 3000);
		},
		handleInput($event) {
			this.$emit("update:modelValue", $event.target.value);
		},
	},
};
</script>
