<template>
	<header-container>
		<template #title>
			<h1 class="w-full text-4xl font-normal">Artist Statement</h1>
		</template>
		<template #subtitle>
			<h2 class="my-4 w-full text-base font-light">2022-2023</h2>
		</template>
	</header-container>
	<texts-artist-statement />
</template>

<script lang="ts" setup>
import HeaderContainer from "@/components/Shared/HeaderContainer.vue";
import TextsArtistStatement from "@/components/TextsResults/TextsArtistStatement.vue";
</script>
