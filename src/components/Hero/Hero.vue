<script lang="ts" setup>
import { HeroHeadline, HeroImage, HeroLayout } from "@/components/Hero";
import ArtworkSearchForm from "@/components/ArtworkResults/ArtworkSearch/ArtworkSearchForm.vue";
</script>

<template>
	<HeroLayout>
		<HeroHeadline />
		<ArtworkSearchForm />
		<template #hero-image>
			<HeroImage />
		</template>
	</HeroLayout>
</template>
