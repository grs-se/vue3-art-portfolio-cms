<template>
	<section id="grid-cards-gallery">
		<!-- <artwork-cards class="mx-auto border-l border-t sm:columns-2 xl:columns-5"> -->
		<artwork-cards
			class="mx-auto border-l border-t sm:columns-2 xl:grid xl:grid-cols-3"
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
						:src="'images/' + imageCover"
						class="mx-auto place-self-center hover:shadow-gray xs:max-h-full xl:max-h-72"
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

<script lang="ts" setup>
import { computed, ref } from "vue";

import ArtworkCards from "@/components/ArtworkResults/ArtworkCards.vue";
import ArtworkCardHoverModal from "@/components/ArtworkResults/ArtworkCardHoverModal.vue";

const hover = ref<boolean>(false);

// const displayModalOnHover = computed(() => {
// 	if (hover.value === true);
// });
</script>
