<template>
	<collapsible-accordian header="Categories">
		<div class="mt-5">
			<fieldset>
				<ul class="flex flex-row flex-wrap">
					<li
						v-for="category in UNIQUE_CATEGORIES"
						:key="category"
						class="h-8 w-1/2"
					>
						<input
							:id="category"
							v-model="selectedCategories"
							:value="category"
							type="checkbox"
							class="mr-3"
							@change="selectCategory"
						/>
						<label :for="category">{{ category }}</label>
					</li>
				</ul>
			</fieldset>
		</div>
	</collapsible-accordian>
</template>

<script>
import { mapActions, mapState } from "pinia";

import { useArtworksStore, UNIQUE_CATEGORIES } from "@/stores/artworks";
import { useUserStore, ADD_SELECTED_CATEGORIES } from "@/stores/user";

import CollapsibleAccordian from "@/components/Shared/CollapsibleAccordian.vue";

export default {
	name: "ArtworkFiltersSidebarCategories",
	components: {
		CollapsibleAccordian,
	},
	data() {
		return {
			selectedCategories: [],
		};
	},
	computed: {
		...mapState(useArtworksStore, [UNIQUE_CATEGORIES]),
	},
	methods: {
		...mapActions(useUserStore, [ADD_SELECTED_CATEGORIES]),
		selectCategory() {
			this.ADD_SELECTED_CATEGORIES(this.selectedCategories);
			this.$router.push({ name: "ArtworkResults" });
		},
	},
};
</script>
