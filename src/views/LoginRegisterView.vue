<template lang="pug">
section
	.login-register(class="gap-12")
			LoginFormView
			//- RegisterFormView
</template>

<script lang="ts">
import LoginFormView from "@/components/LoginRegister/LoginFormView.vue";
import RegisterFormView from "@/components/LoginRegister/RegisterFormView.vue";

export default {
	components: {
		LoginFormView,
		RegisterFormView,
	},
};
</script>

<style scoped>
section {
	@apply mx-auto flex h-full w-full bg-brand-gray-2 p-8;
}
.login-register {
	/* background-color: #fff; */
	@apply mx-auto flex flex-row rounded border-1 border-solid border-gray-300;
}
/* section {
	margin: 0 auto;
	background-color:;
} */
</style>
