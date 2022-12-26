<template>
	<section>
		<spot-light
			class="mt-10 flex w-max flex-row justify-center overflow-y-hidden pb-16"
		>
			<template
				#default="{ imageCover, title, description, medium, categories }"
			>
				<router-link
					to="/gallery"
					class="mx-5 flex h-auto max-w-sm flex-col rounded-lg border bg-white"
				>
					<img
						:src="'/images/artworks/' + imageCover"
						class="h-64 content-start object-contain"
					/>

					<div class="mt-3 h-48 px-6 py-4">
						<h3 class="text-lg font-medium">
							{{ title }}
						</h3>
						<p class="line-clamp mt-3 text-sm">
							{{ medium[1] }}
						</p>
						<p class="line-clamp mt-3 text-sm">
							{{ description }}
						</p>
					</div>

					<div class="px-6 pb-4 text-sm">
						<router-link to="/gallery" class="text-brand-blue-1"
							>Read more</router-link
						>
					</div>

					<div class="px-6 pb-4 text-sm">
						<span>Category: </span>
						<router-link to="/gallery" class="text-brand-blue-1">{{
							categories
						}}</router-link>
					</div>
				</router-link>
			</template>
		</spot-light>
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
import { ref, computed } from "vue";

import ActionButton from "@/components/Shared/ActionButton.vue";
import SpotLight from "@/components/Shared/SpotLight.vue";
// import SpotLightSlides from "@/components/Shared/SpotLightSlides.vue";

const curSlide = ref([]);

const nextSlide = computed(() => {});

const prevSlide = computed(() => {});

const goToSlide = function (slide) {};
</script>

<style scoped>
.line-clamp {
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 3;
	overflow: hidden;
}
</style>
