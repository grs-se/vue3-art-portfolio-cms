<template>
	<section>
		<header-container
			><template #title>
				<h1 class="w-full text-4xl font-normal">Blog</h1>
			</template>
			<template #subtitle>
				<h2 class="my-4 w-full text-base font-light">Recent Posts</h2>
			</template></header-container
		>
	</section>
</template>

<script setup>
import HeaderContainer from "@/components/Shared/HeaderContainer.vue";
</script>
