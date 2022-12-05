<template>
	<header class="w-full text-sm">
		<div class="fixed top-0 left-0 h-16 w-full bg-white">
			<div
				class="mx-auto flex h-full flex-nowrap border-b border-solid border-brand-gray-1 px-8"
			>
				<router-link
					:to="{ name: 'Home' }"
					class="flex h-full items-center text-xl"
					>George Rice-Smith</router-link
				>

				<nav class="ml-12 h-full">
					<ul class="m-0 flex h-full list-none p-0">
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
					<hamburger-menu />
				</div>
			</div>
		</div>
	</header>
</template>

<script>
import HamburgerMenu from "@/components/Navigation/HamburgerMenu.vue";

export default {
	name: "MainNav",
	components: {
		HamburgerMenu,
	},
	data() {
		return {
			menuItems: [
				{ text: "Gallery", url: "/" },
				{ text: "Research", url: "/research" },
				{ text: "Writing", url: "/" },
				{ text: "Exhibitions", url: "/" },
				{ text: "Statement", url: "/texts/artist-statement" },
				{ text: "About", url: "/" },
				{ text: "Contact", url: "/" },
			],
		};
	},
};
</script>
