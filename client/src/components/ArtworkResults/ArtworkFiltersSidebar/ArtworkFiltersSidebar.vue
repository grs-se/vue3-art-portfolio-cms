<script lang="ts" setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";

import CollapsibleAccordian from "@/components/Shared/CollapsibleAccordian.vue";
import {
	ArtworkFiltersSidebarCategories,
	ArtworkFiltersSidebarLocations,
	ArtworkFiltersSidebarPrompt,
	ArtworkFiltersSidebarTags,
} from "@/components/ArtworkResults/ArtworkFiltersSidebar";

import { useUserMovementsStore } from "@/stores/userMovements";

const route = useRoute();
const userMovementsStore = useUserMovementsStore();

const parseTagsSeachTerm = () => {
	const tag = (route.query.tag as string) || "";
	userMovementsStore.UPDATE_TAGS_SEARCH_TERM(tag);
};

onMounted(parseTagsSeachTerm);
</script>

<template>
	<div
		class="flex flex-col border-r border-b border-solid border-brand-gray-1 bg-white p-4 xs:w-full md:w-96"
	>
		<!-- <div
		class="flex flex-col border-r border-b border-solid border-brand-gray-1 bg-white p-4 xs:w-full md:w-80"
	> -->
		<section class="pb-5">
			<artwork-filters-sidebar-prompt />

			<artwork-filters-sidebar-tags />

			<collapsible-accordian header="Categories">
				<artwork-filters-sidebar-categories />
			</collapsible-accordian>

			<collapsible-accordian header="Locations">
				<artwork-filters-sidebar-locations />
			</collapsible-accordian>
		</section>
	</div>
</template>
