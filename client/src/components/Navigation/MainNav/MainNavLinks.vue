<script lang="ts" setup>
import { ref } from "vue";

const links = ref([
	{ text: "Gallery", url: "/gallery" },
	{ text: "Research", url: "/research" },
	{ text: "Text", url: "/text" },
	{ text: "Exhibitions", url: "/" },
	{ text: "Statement", url: "/text/artist-statement" },
	{ text: "About", url: "/" },
	{ text: "Contact", url: "/" },
]);
</script>

<template>
	<nav class="ml-12 h-full">
		<ul class="m-0 h-full list-none p-0 xs:hidden xl:flex">
			<li
				v-for="link in links"
				:key="link.text"
				data-test="main-nav-list-item"
				class="ml-9 h-full text-base first:ml-0"
			>
				<RouterLink :to="link.url" class="flex h-full items-center py-2">{{
					link.text
				}}</RouterLink>
			</li>
		</ul>
	</nav>
</template>
