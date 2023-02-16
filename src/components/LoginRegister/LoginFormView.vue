<template>
	<div class="login-form">
		<h3 class="h3">
			<form action="" class="form">
				<div class="form__group">
					<label for="" class="form__label"></label>
					<input
						v-model="LoginData.Email"
						type="email"
						placeholder="you@example.com"
						required
					/>
				</div>
				<div class="form__group">
					<label for="" class="form__label"></label>
					<input
						v-model="LoginData.Password"
						type="password"
						placeholder="*********"
						required
					/>
				</div>
				<div class="form__group">
					<button
						class="btn btn-primary login-btn"
						@click="LOGIN_USER($event)"
					></button>
				</div>
			</form>
		</h3>
	</div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
// import TextInput from "@/components/Shared/TextInput";

const LoginData = ref({
	Email: "",
	Password: "",
});

// const userStore = useUserStore();
// const LOGIN_USER = function (e) {
// 	e.preventDefault();
// 	console.log("Log", this.LoginData);
// };

// const LoginError = ref(false);

// const getUserData = (Token) => {};
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
/* .form {
	@apply py-2 px-6;
}

.form__group {
	@apply flex flex-col py-2;
}

.form__input {
	@apply border border-1;
} */
.login-form {
	margin: 0 auto;
	max-width: 55rem;
	background-color: #fff;
	-webkit-box-shadow: 0 2.5rem 8rem 2rem rgba(0, 0, 0, 0.06);
	box-shadow: 0 2.5rem 8rem 2rem rgba(0, 0, 0, 0.06);
	@apply px-8 py-8;
	border-radius: 5px;
}

.form__input {
	@apply h-full w-full p-2
	font-normal focus:outline-none;
	font-family: inherit;
	color: inherit;
	border: none;
	width: 100%;
	/* background-color: #fff; */
	background-color: #f2f2f2;
	border-top: 3px solid transparent;
	border-bottom: 3px solid transparent;
	-webkit-transition: all 0.3s;
	transition: all 0.3s;
	border-radius: 4px;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	/* Pseudo element (a visible thing that isn't really in the DOM).
      Also needs -ms- */
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

.form__label {
	@apply block text-base;
}
</style>
