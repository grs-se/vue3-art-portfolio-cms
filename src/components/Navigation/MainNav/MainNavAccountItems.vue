<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores";

import { ActionButton } from "@/components/Shared";
import Avatar from "./MainNavAvatar.vue";

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const toggleLoginModal = () => {};
</script>

<template>
	<div class="ml-auto flex h-full items-center">
		<Avatar v-if="user" />
		<router-link v-else to="/LoginRegister">
			<!-- <ActionButton text="Sign in" @click="login" /> -->
			<ActionButton text="Sign in" @click="toggleLoginModal" />
		</router-link>
	</div>
</template>
