<template>
	<header :class="['w-full', 'text-sm', 'font-normal', headerHeightClass]">
		>
		<div class="fixed top-0 left-0 h-16 w-full bg-white">
			<div
				class="mx-auto flex h-full flex-nowrap border-b border-solid border-brand-gray-1 px-8"
			>
				<div class="h-full items-center sm:flex md:hidden">
					<hamburger-menu @click="openSideNav" />
				</div>
				<router-link
					:to="{ name: 'Home' }"
					class="flex h-full items-center text-xl sm:ml-4 md:ml-0"
					>George Rice-Smith</router-link
				>

				<nav class="ml-12 h-full">
					<ul class="m-0 h-full list-none p-0 sm:hidden xl:flex">
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
					<action-button v-else text="Sign in" @click="LOGIN_USER" />
				</div>
			</div>

			<!-- <the-subnav /> -->
			<the-subnav v-if="isLoggedIn" />
		</div>
	</header>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";

import { useUserStore } from "@/stores/user";

import ActionButton from "@/components/Shared/ActionButton.vue";
import ProfileImage from "@/components/Navigation/ProfileImage.vue";
import TheSubnav from "@/components/Navigation/TheSubnav.vue";
import HamburgerMenu from "@/components/Navigation/HamburgerMenu.vue";

const menuItems = ref([
	{ text: "Gallery", url: "/gallery/" },
	{ text: "Research", url: "/research/" },
	{ text: "Text", url: "/text/" },
	{ text: "Exhibitions", url: "/" },
	{ text: "Statement", url: "/text/artist-statement" },
	{ text: "About", url: "/" },
	{ text: "Contact", url: "/" },
]);

const userStore = useUserStore();
const LOGIN_USER = userStore.LOGIN_USER;
const isLoggedIn = computed(() => userStore.isLoggedIn);
const headerHeightClass = computed(() => ({
	"h-16": !isLoggedIn.value,
	"h-32": isLoggedIn.value,
}));
const openSideNav = computed(() => console.log("Open Side Nav"));
</script>
