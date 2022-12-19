<template>
	<main class="flex h-auto flex-col">
		<!-- <section class="pt-10 pb-20">
			<div class="grid grid-cols-12">
				<div class="col-span-2 col-start-1"></div>

				<div class="col-span-3 col-start-3 mb-20 self-end">
					<artwork-search-form class="" />
				</div>

				<div
					v-for="hero in displayedHeroImages"
					:key="hero.id"
					class="col-span-4 col-start-8 self-center justify-self-center"
				>
					<img
						class="object-contain"
						:src="'/images/artworks/' + hero.imageCover"
					/>
				</div>

				<div class="col-span-1 col-start-12"></div>
			</div>
		</section> -->

		<header-container>
			<template #title>
				<h1 class="w-full text-4xl font-normal">Recent Works</h1>
			</template>
			<template #subtitle>
				<h2 class="my-4 w-full text-base font-light">Highlights</h2>
			</template>
		</header-container>
		<spot-light class="mt-10 flex flex-row justify-center pb-16">
			<template #default="{ imageCover, title, description, medium }">
				<router-link
					to="/gallery"
					class="mx-5 flex h-auto flex-col rounded-lg border bg-white"
				>
					<img
						:src="'/images/artworks/' + imageCover"
						class="h-64 content-start object-contain"
					/>

					<div class="mt-3 h-48 px-6 py-4">
						<h3 class="text-lg font-medium">
							{{ title }}
						</h3>
						<p class="line-clamp mt-3 text-sm">
							{{ description }}
						</p>
						<!-- <p class="line-clamp mt-3 text-sm">
							{{ medium }}
						</p> -->
					</div>

					<router-link to="/gallery" class="px-6 pb-4 text-sm text-brand-blue-1"
						>See artworks</router-link
					>
				</router-link>
			</template>
		</spot-light>

		<div class="h-32">
			<div class="flex justify-between px-40">
				<!-- <action-button text="<" class="slideShow right-4" />
				<action-button text=">" class="slideShow left-4" /> -->
			</div>
		</div>
	</main>
</template>

<script setup>
import { useArtworksStore } from "@/stores/artworks";

import { computed, onMounted } from "vue";

import TheHeadline from "@/components/ArtworkSearch/TheHeadline.vue";
import ArtworkSearchForm from "@/components/ArtworkSearch/ArtworkSearchForm.vue";
import HeaderContainer from "@/components/Shared/HeaderContainer.vue";
import SpotLight from "@/components/ArtworkSearch/SpotLight.vue";
import ActionButton from "@/components/Shared/ActionButton.vue";

const artworksStore = useArtworksStore();
onMounted(artworksStore.FETCH_ARTWORKS);

const HERO = computed(() => artworksStore.HERO);

const displayedHeroImages = computed(() => {
	return HERO.value;
});
</script>

<style scoped>
.line-clamp {
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 3;
	overflow: hidden;
}
</style>
