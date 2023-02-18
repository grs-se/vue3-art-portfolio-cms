<script lang="ts" setup>
import { computed } from "vue";

import { useArtworksStore } from "@/stores/artworks";

const artworksStore = useArtworksStore();

const ARTWORK_HERO = computed(() => artworksStore.ARTWORK_HERO);
</script>
<template>
	<div
		v-for="hero in ARTWORK_HERO"
		:key="hero.id"
		class="col-span-5 col-start-7 self-center justify-self-center"
	>
		<img class="object-contain" :src="'images/' + hero.imageCover" />
	</div>
</template>
