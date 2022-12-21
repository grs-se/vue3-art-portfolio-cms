<template>
	<artwork-cards>
		<template #default="{ imageCover, title }">
			<section class="max-w-80 flex max-h-80 flex-col bg-white">
				<figure>
					<img :src="'public/images/artworks/' + imageCover" alt="" />
				</figure>
				<figcaption class="hidden bg-white">
					<h3>{{ title }}</h3>
				</figcaption>
			</section>
		</template>
	</artwork-cards>
</template>

<script lang="ts" setup>
import ArtworkCards from "@/components/ArtworkResults/ArtworkCards.vue";
</script>
