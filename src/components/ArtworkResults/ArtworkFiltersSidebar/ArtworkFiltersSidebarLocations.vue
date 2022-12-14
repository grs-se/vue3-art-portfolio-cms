<template>
	<collapsible-accordian header="Locations">
		<div class="mt-5">
			<fieldset>
				<ul class="flex flex-row flex-wrap">
					<li
						v-for="location in UNIQUE_LOCATIONS"
						:key="location"
						class="h-8 w-1/2"
					>
						<input
							:id="location"
							v-model="selectedLocations"
							:value="location"
							type="checkbox"
							class="mr-3"
							@change="selectLocation"
						/>
						<label class="capitalize" :for="location">{{ location }}</label>
					</li>
				</ul>
			</fieldset>
		</div>
	</collapsible-accordian>
</template>

<script>
import { mapActions, mapState } from "pinia";

import { useArtworksStore, UNIQUE_LOCATIONS } from "@/stores/artworks";
import { useUserStore, ADD_SELECTED_LOCATIONS } from "@/stores/user";

import CollapsibleAccordian from "@/components/Shared/CollapsibleAccordian.vue";

export default {
	name: "ArtworkFiltersSidebarLocations",
	components: {
		CollapsibleAccordian,
	},
	data() {
		return {
			selectedLocations: [],
		};
	},
	computed: {
		...mapState(useArtworksStore, [UNIQUE_LOCATIONS]),
	},
	methods: {
		...mapActions(useUserStore, [ADD_SELECTED_LOCATIONS]),
		selectLocation() {
			this.ADD_SELECTED_LOCATIONS(this.selectedLocations);
			this.$router.push({ name: "ArtworkResults" });
		},
	},
};
</script>
