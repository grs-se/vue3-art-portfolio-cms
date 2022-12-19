<template>
	<section id="grid-cards-gallery">
		<artwork-cards
			class="mx-auto grid border-l border-t sm:grid-cols-1 md:grid-cols-2 xl:max-w-gallery xl:grid-cols-3"
		>
			<!-- <artwork-card
		class="mx-auto grid rounded border border-solid bg-white p-4 sm:grid-cols-1 sm:gap-2 md:grid-cols-2 xl:max-w-gallery xl:grid-cols-3 xl:gap-9"
	> -->
			<template #default="{ imageCover, title }">
				<figure
					class="flex h-full w-full border-b border-r border-solid bg-white p-4 hover:bg-white"
				>
					<!-- <figure
				class="flex h-full w-full rounded border border-solid border-brand-gray-2 hover:shadow-gray"
				
			> -->
					<img
						:src="'/images/artworks/' + imageCover"
						class="mx-auto max-h-60 place-self-center hover:shadow-gray"
						@mouseover="hover = true"
						@mouseleave="hover = false"
					/>
				</figure>
				<figcaption class="hidden bg-white">
					<h3>{{ title }}</h3>
				</figcaption>
			</template>
		</artwork-cards>
	</section>
</template>

<script>
import ArtworkCards from "@/components/ArtworkResults/ArtworkCards.vue";
import ArtworkCardHoverModal from "@/components/ArtworkResults/ArtworkCardHoverModal.vue";

export default {
	name: "GridCardsGallery",
	components: {
		ArtworkCards,
		ArtworkCardHoverModal,
	},
	data() {
		return {
			hover: false,
		};
	},
	methods: {
		displayModalOnHover() {
			console.log("Hover Modal");
		},
	},
};
</script>
