<template>
	<header-container>
		<template v-slot:title>
			<h1 class="w-full text-4xl font-normal">Artist Statement</h1>
		</template>
		<template v-slot:subtitle>
			<h2 class="my-4 w-full text-base font-light">2022-2023</h2>
		</template>
	</header-container>
</template>

<script>
import HeaderContainer from "@/components/Shared/HeaderContainer.vue";

export default { name: "ArtistStatementView", components: { HeaderContainer } };
</script>
