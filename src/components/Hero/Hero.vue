<template>
	<HeroLayout>
		<HeroHeadline />
		<ArtworkSearchForm />
		<template #hero>
			<HeroImage />
		</template>
	</HeroLayout>
</template>

<script lang="ts" setup>
import { HeroHeadline, HeroImage, HeroLayout } from "@/components/Hero";
import ArtworkSearchForm from "@/components/ArtworkResults/ArtworkSearch/ArtworkSearchForm.vue";
</script>
