<template>
	<div class="form-wrapper border-solid border-brand-gray-3">
		<div class="row">
			<div class="col">
				<h4 class="text-xl font-normal">Login</h4>
			</div>
		</div>
		<form action="">
			<div class="row">
				<div class="form-group">
					<input
						type="email"
						class="form-control email-input"
						placeholder="Email"
					/>
				</div>
				<div class="form-group">
					<input
						type="password"
						class="form-control password-input"
						placeholder="Password"
					/>
				</div>
			</div>
		</form>
	</div>
</template>

<script lang="ts" setup>
import TextInput from "@/components/Shared/TextInput.vue";
</script>

<style>
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
	/* padding: 0.5rem 0; */
	@apply py-2 px-6;
}

.form__group {
	@apply flex flex-col py-2;
}

.form__input {
	@apply border border-1;
}
</style>
