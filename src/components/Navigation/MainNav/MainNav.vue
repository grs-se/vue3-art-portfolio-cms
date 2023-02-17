<script lang="ts" setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores";

import {
	MainNavAccountItems,
	MainNavLinks,
	MainNavHamburgerMenu,
	MainNavSiteTitle,
} from "@/components/Navigation/MainNav";
import { SubNav } from "@/components/Navigation/SubNav";

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const isLoggedIn = computed(() => user.value);
const navHeightClass = computed(() => ({
	"h-16": !isLoggedIn.value,
	"h-32": isLoggedIn.value,
}));
</script>

<template>
	<nav :class="['w-full', 'text-sm', 'font-normal', navHeightClass]">
		<div class="fixed top-0 left-0 z-50 h-16 w-full bg-white">
			<div
				class="mx-auto flex h-full flex-nowrap border-b border-solid border-brand-gray-1 px-8"
			>
				<MainNavHamburgerMenu />
				<MainNavSiteTitle />
				<MainNavLinks />
				<MainNavAccountItems />

				<SubNav v-show="authStore.user" />
			</div>
		</div>
	</nav>
</template>
