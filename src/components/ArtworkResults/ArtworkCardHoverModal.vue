<template>
	<artwork-card>
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
	</artwork-card>
</template>
<script>
import ArtworkCard from "@/components/ArtworkResults/ArtworkCard.vue";

export default {
	name: "ArtworkCardHoverModal",
	components: { ArtworkCard },
};
</script>
