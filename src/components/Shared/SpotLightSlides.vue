<template>
	<spot-light
		class="mt-10 flex w-max flex-row justify-center overflow-y-hidden pb-16"
	>
		<template #default="{ imageCover, title, medium, description, categories }">
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
						{{ description }}
					</p>
					<p class="line-clamp mt-3 text-sm">
						{{ medium }}
					</p>
				</div>

				<router-link to="/gallery" class="px-6 pb-4 text-sm text-brand-blue-1"
					>More from {{ categories[0] }}</router-link
				>
			</router-link>
		</template>
	</spot-light>
</template>

<script lang="ts" setup>
import SpotLight from "@/components/Shared/SpotLight.vue";
</script>
