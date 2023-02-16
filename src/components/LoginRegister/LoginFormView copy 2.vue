<template lang="pug">
.login-form
	h3.h3 Login
	form.form
		FormSlot(id="email", for="email", placeholder="email", minLength="8")
		//- .form__group 
		//- 	label.form__label(for="email") Email Address
		//- 	input#email.form__input(type="email", placeholder="you@example.com", required)
		//- .form__group 
		//- 	label.form__label(for="password") Password
		//- 	input#password.form__input(type="password", placeholder='••••••••', required, minlength='8')
		//- .form__group
		//- 	button.btn.btn--green Login
</template>

<script lang="ts" setup>
import FormSlot from "@/components/Shared/FormSlot.vue";
</script>

<style scoped>
/* .login-form {
} */

/* .login-form {
	@apply {
	}
} */
.h3 {
	@apply text-xl font-normal;
}
.form {
	padding: 0.5rem 0;
	/* @apply py-2; */
}

.form__group {
	@apply flex flex-col py-2;
}

.form__input {
	@apply border border-1;
}
</style>
