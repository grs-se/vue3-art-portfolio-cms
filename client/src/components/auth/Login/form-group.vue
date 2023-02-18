<script setup>
const props = defineProps({
	label: { type: String, required: true },
	name: {
		type: String,
		required: true,
	},
	placeholder: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: false,
		default: "text",
	},
	invalidFeedback: {
		type: String,
		required: false,
		default: "",
	},
});
</script>

<template>
	<div class="form__group">
		<label :for="name" class="form__label">{{ label }}</label>
		<input
			v-model="text"
			class="form__input"
			:type="type"
			:placeholder="placeholder"
		/>
		<div class="invalid-feedback">
			{{ invalidFeedback }}
		</div>
	</div>
</template>

<style scoped>
.form__input {
	height: 100%;
	width: 100%;
	padding: 0.5rem;
	font-weight: normal;
	font-family: inherit;
	color: inherit;
	border: none;
	width: 100%;
	background-color: #f2f2f2;
	border-top: 3px solid transparent;
	border-bottom: 3px solid transparent;
	-webkit-transition: all 0.3s;
	transition: all 0.3s;
	border-radius: 4px;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
}
.form__input:focus {
	outline: none;
	border-bottom: 3px solid #55c57a;
}
.form__input:focus:invalid {
	border-bottom: 3px solid #ff7730;
}
.form__input::-webkit-input-placeholder {
	color: #bbb;
}

.form__group:not(:last-child) {
	@apply mb-2;
}

.form__group:last-child {
	@apply mt-6;
}

.form__label {
	@apply block text-base;
}

.invalid-feedback {
	@apply text-sm text-red-600;
}
</style>
