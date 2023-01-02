<template>
	<section>
		<ul
			class="mt-10 flex w-max flex-row justify-center overflow-y-hidden pb-16"
		>
			<li v-for="spotlight in spotlights" :key="spotlight.id" class="slide">
				<router-link
					to="/gallery"
					class="slide mx-5 flex flex-col rounded-lg border bg-white"
				>
					<figure class="flex flex-col justify-center">
						<img
							:src="'/images/artworks/' + spotlight.imageCover"
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
							<p class="line-clamp mt-3 text-sm">
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
				<action-button text="<" class="slideShow right-4" @click="prevSlide" />
				<action-button text=">" class="slideShow left-4" @click="nextSlide" />
			</div>
		</div>
	</section>
</template>

<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

import ActionButton from "@/components/Shared/ActionButton.vue";

import { useArtworksStore } from "@/stores/artworks";

const artworksStore = useArtworksStore();
onMounted(artworksStore.FETCH_ARTWORKS);

// const spotlights = computed(() => artworksStore.ARTWORK_SPOTLIGHTS);

const spotlights = computed(() => artworksStore.ARTWORK_SPOTLIGHTS);

const maxSpotlights = spotlights.value.length;

const renderSlideShow = () => {
	console.log(maxSpotlights, "💥");
	const slides = document.querySelectorAll(".slide");
	// console.log(slides);
	const maxSlide = slides.length;
	// console.log(maxSlide);
};

onMounted(() => {
	renderSlideShow();
});

// const curSlide = ref([]);

// const nextSlide = computed(() => {});

// const prevSlide = computed(() => {});

// const goToSlide = function (slide) {
// 	spotlights.forEach(
// 		(s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
// 	);
// };

// const slideShow = () => {
// 	const slides = document.querySelectorAll(".slide");

// 	const curSlide = ref([0]);
// 	const maxSlide = slides.length;
// 	console.log(maxSlide);

// 	const nextSlide = computed(() => {});

// 	const prevSlide = computed(() => {});

// 	const goToSlide = function (slide) {
// 		slides.value.forEach(
// 			(s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
// 		);
// 	};
// };

// let slides = ref([]);

// onMounted(artworksStore.ARTWORK_SPOTLIGHTS);
// onMounted(() => {
// 	slides.value = document.querySelectorAll(".slide");
// });

// onMounted(artworksStore.FETCH_ARTWORKS);
// const props = defineProps({ spotlights: {
// 	type: function
// } });

// onMounted(() => {
// 	console.log("hi");
// 	artworksStore.FETCH_ARTWORKS;
// 	props.spotlights = computed(() => artworksStore.ARTWORK_SPOTLIGHTS);
// });
</script>

<style scoped>
.line-clamp {
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 3;
	overflow: hidden;
}
</style>

<!-- <template>
	<section>
		<ul
			class="mt-10 flex w-max flex-row justify-center overflow-y-hidden pb-16"
		>
			<li v-for="spotlight in spotlights" :key="spotlight.id" class="slide">
				<router-link
					to="/gallery"
					class="slide mx-5 flex h-auto max-w-sm flex-col rounded-lg border bg-white"
				>
					<img
						:src="'/images/artworks/' + spotlight.imageCover"
						class="h-64 content-start object-contain"
					/>

					<div class="mt-3 h-48 px-6 py-4">
						<h3 class="text-lg font-medium">
							{{ spotlight.title }}
						</h3>
						<div class="nowrap flex flex-row justify-between">
							<p class="line-clamp mt-3 text-sm">
								{{ medium[1] }}
							</p>
							<p class="line-clamp mt-3 text-sm">
								{{ dimensions.height.px }} x {{ dimensions.width.px }}cm
							</p>
						</div>
						<p class="line-clamp mt-3 text-sm">
							{{ spotlight.description }}
						</p>
						<div class="pb-4 text-sm">
							<router-link to="/gallery" class="text-brand-blue-1"
								>Read more</router-link
							>
						</div>
					</div>

					<div class="px-6 pb-4 text-sm">
						<span>Category: </span>
						<router-link to="/gallery" class="capitalize text-brand-blue-1">{{
							spotlight.categories[0]
						}}</router-link>
					</div>
				</router-link>
				</template>
			</li>
		</ul>
		<spot-light-slides />
		<div class="h-32">
			<div class="flex justify-between px-40">
				<action-button text="<" class="slideShow right-4" @click="prevSlide" />
				<action-button text=">" class="slideShow left-4" @click="nextSlide" />
			</div>
		</div>
	</section>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";

import ActionButton from "@/components/Shared/ActionButton.vue";

import { useArtworksStore } from "@/stores/artworks";

const artworksStore = useArtworksStore();
onMounted(artworksStore.FETCH_ARTWORKS);

// const spotlights = computed(() => artworksStore.ARTWORK_SPOTLIGHTS);

const spotlights = computed(() => artworksStore.ARTWORK_SPOTLIGHTS);

const maxSpotlights = spotlights.value.length;
console.log(maxSpotlights, "💥");

onMounted(() => {
	// artworksStore.FETCH_ARTWORKS;
	const slides = document.querySelectorAll(".slide");
	console.log(slides);
	const maxSlide = slides.length;
	console.log(maxSlide);
});

// const curSlide = ref([]);

// const nextSlide = computed(() => {});

// const prevSlide = computed(() => {});

// const goToSlide = function (slide) {
// 	spotlights.forEach(
// 		(s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
// 	);
// };

// const slideShow = () => {
// 	const slides = document.querySelectorAll(".slide");

// 	const curSlide = ref([0]);
// 	const maxSlide = slides.length;
// 	console.log(maxSlide);

// 	const nextSlide = computed(() => {});

// 	const prevSlide = computed(() => {});

// 	const goToSlide = function (slide) {
// 		slides.value.forEach(
// 			(s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
// 		);
// 	};
// };

// let slides = ref([]);

// onMounted(artworksStore.ARTWORK_SPOTLIGHTS);
// onMounted(() => {
// 	slides.value = document.querySelectorAll(".slide");
// });

// onMounted(artworksStore.FETCH_ARTWORKS);
// const props = defineProps({ spotlights: {
// 	type: function
// } });

// onMounted(() => {
// 	console.log("hi");
// 	artworksStore.FETCH_ARTWORKS;
// 	props.spotlights = computed(() => artworksStore.ARTWORK_SPOTLIGHTS);
// });
</script>

<style scoped>
.line-clamp {
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 3;
	overflow: hidden;
}
</style> -->
