<template>
	<main class="flex h-screen flex-col">
		<header-container>
			<template #title>
				<h1 class="w-full text-4xl font-normal">Recent Works</h1>
			</template>
			<template #subtitle>
				<h2 class="my-4 w-full text-base font-light">Highlights</h2>
			</template>
		</header-container>
		<spot-light class="flex flex-row justify-center pb-16">
			<template #default="{ imageCover, title, description }">
				<router-link
					to="/gallery"
					class="mx-5 flex h-auto w-72 flex-col rounded-lg border bg-brand-gray-2"
				>
					<img :src="'/images/artworks/' + imageCover" class="object-contain" />

					<div class="mt-3 h-48 px-6 py-4">
						<h3 class="text-lg font-medium">
							{{ title }}
						</h3>

						<p class="mt-3 text-sm">
							{{ description }}
						</p>
					</div>

					<router-link to="/gallery" class="px-6 pb-4 text-sm text-brand-blue-1"
						>See artworks</router-link
					>
				</router-link>
			</template>
		</spot-light>
	</main>
</template>

<script>
// import TheHeadline from "@/components/ArtworkSearch/TheHeadline.vue";
// import ArtworkSearchForm from "@/components/ArtworkSearch/ArtworkSearchForm.vue";
import HeaderContainer from "@/components/Shared/HeaderContainer.vue";
import SpotLight from "@/components/ArtworkSearch/SpotLight.vue";

export default {
	name: "TheHero",
	components: {
		// TheHeadline,
		// ArtworkSearchForm,
		SpotLight,
		HeaderContainer,
	},
};
</script>
