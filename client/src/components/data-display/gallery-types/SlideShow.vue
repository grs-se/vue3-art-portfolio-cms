<script lang="ts" setup>
import { computed, onMounted } from "vue";

import ActionButton from "@/components/Shared/ActionButton.vue";

import { useArtworksStore } from "@/stores/artworks";

const artworksStore = useArtworksStore();
onMounted(artworksStore.FETCH_ARTWORKS);

const spotlights = computed(() => artworksStore.ARTWORK_SPOTLIGHTS);
</script>

<template>
	<section>
		<ul class="mt-10 flex w-max flex-row justify-center overflow-x-clip pb-16">
			<li v-for="spotlight in spotlights" :key="spotlight.id" class="slide">
				<router-link
					to="/gallery"
					class="slide mx-5 flex flex-col rounded-lg border bg-white"
				>
					<figure class="flex flex-col justify-center">
						<img
							:src="'images/' + spotlight.imageCover"
							class="max-h-80 content-start object-contain"
						/>

						<figcaption class="mt-3 h-48 max-w-sm px-6 py-4">
							<h3 class="text-lg font-medium">
								{{ spotlight.title }}
							</h3>
							<!-- <div class="nowrap flex flex-row justify-between">
							<p class="line-clamp mt-3 text-sm">
								{{ medium[1] }}
							</p>
							<p class="line-clamp mt-3 text-sm">
								{{ dimensions.height.px }} x {{ dimensions.width.px }}cm
							</p>
						</div> -->
							<p class="line-clamp mt-3 text-justify text-sm">
								{{ spotlight.description }}
							</p>
							<div class="pb-4 text-sm">
								<router-link to="/gallery" class="text-brand-blue-1"
									>Read more</router-link
								>
							</div>
						</figcaption>
					</figure>

					<div class="px-6 pb-4 text-sm">
						<!-- <span>Category: </span> -->
						<router-link to="/gallery" class="capitalize text-brand-blue-1">{{
							spotlight.categories[0]
						}}</router-link>
					</div>
				</router-link>
				<!-- </template> -->
			</li>
		</ul>
		<!-- <spot-light-slides /> -->
		<div class="h-32">
			<div class="flex justify-between px-40">
				<action-button
					text="<"
					btn="slide-show"
					class="right-4"
					@click="prevSlide"
				/>
				<action-button
					text=">"
					btn="slide-show"
					class="left-4"
					@click="nextSlide"
				/>
			</div>
		</div>
	</section>
</template>

<style scoped>
.line-clamp {
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 3;
	overflow: hidden;
}
</style>
