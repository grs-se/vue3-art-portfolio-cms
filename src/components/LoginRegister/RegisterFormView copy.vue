<template>
	<div class="register-form">
		<form action="" class="form">
			<div class="form__group"></div>
		</form>
	</div>

	.register-form h3.h3 Register form.form .form__group
	label.form__label(for="email") Email Address
	input#email.form__input(type="email", placeholder="you@example.com", required)
	.form__group label.form__label(for="password") Password
	input#password.form__input(type="password", placeholder='••••••••', required,
	minlength='8') .form__group label.form__label(for="password") Confirm Password
	input#password.form__input(type="password", placeholder='••••••••', required,
	minlength='8') .form__group button.btn.btn--blue Sign Up
</template>

<script lang="ts">
export default {
	name: "RegisterForm",
	data() {
		return {
			RegisterData: {
				FName: "",
				LName: "",
				Email: "",
				GenderMale: false,
				GenderFemale: false,
				Pass: "",
				confirmPass: "",
				UserDate: [],
			},
			RegisterError: "",
		};
	},
};
</script>
