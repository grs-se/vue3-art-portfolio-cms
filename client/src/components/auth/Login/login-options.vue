<template>
	<div class="flex items-center justify-between">
		<RememberMe />
		<ForgotPassword />
	</div>
	<div class="flex flex-row items-end justify-between">
		<slot></slot>
		<SignUp />
	</div>
</template>

<!-- <template>
	<div class="flex items-center justify-between">
		<slot name="rememberMe"></slot>
		<slot name="forgotPassword"></slot>
	</div>
	<div class="flex flex-row items-end justify-between">
		<slot name="loginBtn"></slot>
		<slot name="signUp"></slot>
	</div>
</template> -->
