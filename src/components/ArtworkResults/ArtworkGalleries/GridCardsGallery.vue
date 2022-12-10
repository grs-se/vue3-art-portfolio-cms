<template>
	<artwork-card
		class="mx-auto grid rounded border border-solid bg-white p-4 sm:grid-cols-1 sm:gap-2 md:grid-cols-2 xl:max-w-gallery xl:grid-cols-3 xl:gap-10"
	>
		<template #default="{ imageCover, title }">
			<figure
				class="flex flex-col rounded border border-solid border-brand-gray-2 hover:shadow-gray"
			>
				<img
					:src="'public/images/artworks/' + imageCover"
					class="items-center justify-center"
				/>
				<figcaption class="hidden bg-white">
					<h3>{{ title }}</h3>
				</figcaption>
			</figure>
		</template>
	</artwork-card>
</template>

<script>
import ArtworkCard from "@/components/ArtworkResults/ArtworkCard.vue";

export default {
	name: "GridCardsGallery",
	components: {
		ArtworkCard,
	},
};
</script>
