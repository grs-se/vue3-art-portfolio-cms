<script lang="ts" setup>
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";

import { useAuthStore } from "@/stores";

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

import ActionButton from "@/components/Shared/ActionButton.vue";
import ProfileImage from "@/components/Navigation/ProfileImage.vue";
import Subnav from "@/components/Navigation/SubNav.vue";
import HamburgerMenu from "@/components/Navigation/HamburgerMenu.vue";
// import SideNav from "@/components/Navigation/SideNav.vue";

const menuItems = ref([
	{ text: "Gallery", url: "/gallery/" },
	{ text: "Research", url: "/research/" },
	{ text: "Text", url: "/text/" },
	{ text: "Exhibitions", url: "/" },
	{ text: "Statement", url: "/text/artist-statement" },
	{ text: "About", url: "/" },
	{ text: "Contact", url: "/" },
]);

const isLoggedIn = computed(() => user.value);
const headerHeightClass = computed(() => ({
	"h-16": !isLoggedIn.value,
	"h-32": isLoggedIn.value,
}));
const isActive = ref(false);

const toggleLoginModal = () => {};
</script>

<template>
	<header :class="['w-full', 'text-sm', 'font-normal', headerHeightClass]">
		>
		<div class="fixed top-0 left-0 z-50 h-16 w-full bg-white">
			<div
				class="mx-auto flex h-full flex-nowrap border-b border-solid border-brand-gray-1 px-8"
			>
				<div class="h-full items-center xs:flex md:hidden">
					<button @click="isActive = !isActive">
						<hamburger-menu />
					</button>
				</div>
				<router-link
					:to="{ name: 'Home' }"
					class="flex h-full items-center text-xl xs:ml-4 md:ml-0"
					>George Rice-Smith</router-link
				>

				<nav class="ml-12 h-full">
					<ul class="m-0 h-full list-none p-0 xs:hidden xl:flex">
						<li
							v-for="menuItem in menuItems"
							:key="menuItem.text"
							data-test="main-nav-list-item"
							class="ml-9 h-full text-base first:ml-0"
						>
							<router-link
								:to="menuItem.url"
								class="flex h-full items-center py-2"
								>{{ menuItem.text }}</router-link
							>
						</li>
					</ul>
				</nav>

				<div class="ml-auto flex h-full items-center">
					<profile-image v-if="isLoggedIn" />
					<router-link v-else to="/LoginRegister">
						<action-button text="Sign in" @click="toggleLoginModal" />
					</router-link>
				</div>
			</div>

			<!-- <SubNav /> -->
			<SubNav v-if="isLoggedIn" />
			<!-- <side-nav v-if="isActive" /> -->
		</div>
	</header>
</template>
