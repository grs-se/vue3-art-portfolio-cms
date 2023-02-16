<template>
	<!-- <div class="form__group"></div>
  label.form__label(for="{{for}}") {{label}}
  input.form__input(id="{{ id }}" type="{{ type }}", placeholder="{{  placeholder }}", {{ required }})
//- .form__group 
//-   label.form__label(for="{{for}}") {{label}}
//-   input.form__input(id="{{ id }}" type="{{ type }}", placeholder="{{  placeholder }}", {{ required }}) -->
</template>

<script lang="ts" setup>
const props = defineProps({
	id: {
		type: String,
	},
	for: {
		type: String,
	},
	placeholder: {
		type: String,
	},
	minLength: {
		type: String,
	},
});
</script>
