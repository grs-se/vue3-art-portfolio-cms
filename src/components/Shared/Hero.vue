<script lang="ts" setup>
import { computed } from "vue";

import { useArtworksStore } from "@/stores/artworks";

const artworksStore = useArtworksStore();

const ARTWORK_HERO = computed(() => artworksStore.ARTWORK_HERO);

// const displayedHeroImages = computed(() => {
// 	return HERO.value;
// });
</script>

<template>
	<section class="pt-10 sm:pb-0 lg:pb-20">
		<div class="sm:flex sm:flex-col xl:grid xl:grid-cols-12">
			<div class="col-span-2 col-start-1"></div>

			<div class="col-span-3 col-start-3 self-center xs:px-8 xs:pb-8 md:px-0">
				<slot></slot>
			</div>

			<div
				v-for="hero in ARTWORK_HERO"
				:key="hero.id"
				class="col-span-5 col-start-7 self-center justify-self-center"
			>
				<img class="object-contain" :src="'images/' + hero.imageCover" />
			</div>

			<div class="col-span-1 col-start-12"></div>
		</div>
	</section>
</template>
