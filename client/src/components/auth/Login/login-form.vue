<script lang="ts" setup>
import { Field, Form } from "vee-validate";
import {
	ForgotPassword,
	LoginButton,
	RememberMe,
	SignUp,
} from "@/components/auth";
import { Alert } from "@/components/Shared";

import * as Yup from "yup";

import { useAuthStore } from "@/stores";

const schema = Yup.object().shape({
	// email: Yup.string().required("Email is required"),
	username: Yup.string().required("Username is required"),
	password: Yup.string().required("Password is required"),
});

async function onSubmit(values) {
	const authStore = useAuthStore();
	const { username, password } = values;
	await authStore.LOGIN(username, password);
}
</script>

<template>
	<div class="login-form">
		<Alert />
		<Form
			v-slot="{ errors, isSubmitting }"
			:validation-schema="schema"
			class="space-y-4 md:space-y-6"
			@submit="onSubmit"
		>
			<div class="form__group">
				<label for="username" class="form__label">Username</label>
				<Field
					id="username"
					type="text"
					name="username"
					class="form__input"
					:class="{ 'is-invalid': errors.username }"
					placeholder="picasso69"
					required=""
				/>
				<div class="invalid-feedback">
					{{ errors.username }}
				</div>
			</div>
			<div class="form__group">
				<label for="password" class="form__label">Password</label>
				<Field
					id="password"
					type="password"
					name="password"
					placeholder="••••••••"
					class="form__input"
					:class="{ 'is-invalid': errors.password }"
					required=""
				/>
				<div class="invalid-feedback">
					{{ errors.password }}
				</div>
			</div>
			<div class="flex items-center justify-between">
				<RememberMe />
				<ForgotPassword />
			</div>
			<div class="flex flex-row items-end justify-between">
				<LoginButton :show="!isSubmitting" />
				<SignUp />
			</div>
		</Form>
	</div>
</template>

<style scoped>
.login-form {
	@apply w-full space-y-4 rounded-md bg-white p-6 shadow sm:max-w-md sm:p-8 md:mt-0 md:space-y-6;
}
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
	border-bottom: 3px solid #66da8c;
}
.form__input:focus:invalid {
	border-bottom: 3px solid #ff9156;
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
