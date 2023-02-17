<template>
	<main class="flex h-auto flex-col">
		<Hero>
			<Headline />
			<ArtworkSearchForm />
		</Hero>
		<SpotlightsHeader />
		<Slideshow />
	</main>
</template>

<script lang="ts" setup>
import {
	Headline,
	Hero,
	Slideshow,
	SpotlightsHeader,
} from "@/components/Shared";
import ArtworkSearchForm from "@/components/ArtworkSearch/ArtworkSearchForm.vue";
</script>
