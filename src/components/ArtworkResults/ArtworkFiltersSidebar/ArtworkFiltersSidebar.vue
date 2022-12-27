<template>
	<div
		class="flex w-96 flex-col border-r border-solid border-brand-gray-1 bg-white p-4"
	>
		<section class="pb-5">
			<div class="flex flex-row justify-between">
				<h3 class="my-4 text-base">Gallery Options</h3>
				<div class="flex items-center text-sm">
					<action-button
						text="Clear Filters"
						type="secondary"
						@click="userStore.CLEAR_USER_ARTWORK_FILTER_SELECTIONS"
					/>
				</div>
			</div>

			<collapsible-accordian header="Categories">
				<artwork-filters-sidebar-categories />
			</collapsible-accordian>

			<collapsible-accordian header="Locations">
				<artwork-filters-sidebar-locations />
			</collapsible-accordian>
		</section>
	</div>
</template>

<script lang="ts" setup>
import ActionButton from "@/components/Shared/ActionButton.vue";
import CollapsibleAccordian from "@/components/Shared/CollapsibleAccordian.vue";
import ArtworkFiltersSidebarCategories from "@/components/ArtworkResults/ArtworkFiltersSidebar/ArtworkFiltersSidebarCategories.vue";
import ArtworkFiltersSidebarLocations from "@/components/ArtworkResults/ArtworkFiltersSidebar/ArtworkFiltersSidebarLocations.vue";

import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
</script>
