<template>
	<li class="mb-7">
		<router-link
			:to="textPageLink"
			class="mx-auto block rounded border border-solid border-brand-gray-2 bg-white hover:shadow-gray"
		>
			<div class="mx-8 border-b border-solid border-brand-gray-1 pt-5 pb-2">
				<h2 class="mb-2 text-2xl">
					{{ text.heading }}
				</h2>

				<div class="flex flex-row align-middle">
					<div class="mr-5">
						<span>{{ text.subHeading }}</span>
					</div>

					<div>
						<ul>
							<li
								v-for="location in text.content"
								:key="location"
								class="mr-5 inline-block"
							>
								<span>{{ location }}</span>
							</li>
						</ul>
					</div>
				</div>
			</div>

			<div class="px-8 py-4">
				<div>
					<h3 class="mt-1 mb-2">Categories:</h3>
					<div>
						<ul class="list-disc pl-8">
							<li v-for="category in text.categories" :key="category">
								{{ category }}
							</li>
						</ul>
					</div>
				</div>

				<div class="mt-2 text-center">
					<router-link :to="textPageLink" class="text-brand-blue-1"
						>Expand</router-link
					>
				</div>
			</div>
		</router-link>
	</li>
</template>

<script lang="ts" setup>
import { computed, type PropType } from "vue";

import type { Text } from "@/api/types";

const props = defineProps({
	text: {
		type: Object as PropType<Text>,
		required: true,
	},
});

const textPageLink = computed(() => `/text/${props.text.id}`);
</script>
