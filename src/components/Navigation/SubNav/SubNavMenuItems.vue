<script lang="ts" setup>
import { ref } from "vue";

const menuItems = ref([
	{ text: "Artworks", url: "/gallery" },
	{ text: "Texts", url: "/research" },
	{ text: "Users", url: "/text" },
]);
</script>

<template>
	<nav class="ml-12 h-full">
		<ul class="m-0 h-full list-none p-0 xs:hidden xl:flex">
			<li
				v-for="menuItem in menuItems"
				:key="menuItem.text"
				data-test="main-nav-list-item"
				class="ml-9 h-full text-base first:ml-0"
			>
				<RouterLink :to="menuItem.url" class="flex h-full items-center py-2">{{
					menuItem.text
				}}</RouterLink>
			</li>
		</ul>
	</nav>
</template>
