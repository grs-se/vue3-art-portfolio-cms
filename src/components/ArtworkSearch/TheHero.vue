<template>
	<main class="flex h-auto flex-col">
		<section class="pt-10 pb-20">
			<div class="grid grid-cols-12">
				<div class="col-span-2 col-start-1"></div>

				<div class="col-span-2 col-start-3 mb-20 self-end">
					<the-headline />
					<artwork-search-form class="" />
				</div>

				<div
					v-for="hero in ARTWORK_HERO"
					:key="hero.id"
					class="col-span-5 col-start-7 self-center justify-self-center"
				>
					<img
						class="object-contain"
						:src="'/images/artworks/' + hero.imageCover"
					/>
				</div>

				<div class="col-span-1 col-start-12"></div>
			</div>
		</section>

		<header-container>
			<template #title>
				<h1 class="w-full text-4xl font-normal">Recent Paintings</h1>
			</template>
			<template #subtitle>
				<h2 class="my-4 w-full text-base font-light">Highlights</h2>
			</template>
		</header-container>
		<slide-show />
	</main>
</template>

<script lang="ts" setup>
import { computed } from "vue";

import { useArtworksStore } from "@/stores/artworks";

import ArtworkSearchForm from "@/components/ArtworkSearch/ArtworkSearchForm.vue";
import HeaderContainer from "@/components/Shared/HeaderContainer.vue";
import SlideShow from "@/components/Shared/SlideShow.vue";
import TheHeadline from "@/components/ArtworkSearch/TheHeadline.vue";

const artworksStore = useArtworksStore();

const ARTWORK_HERO = computed(() => artworksStore.ARTWORK_HERO);

// const displayedHeroImages = computed(() => {
// 	return HERO.value;
// });
</script>
