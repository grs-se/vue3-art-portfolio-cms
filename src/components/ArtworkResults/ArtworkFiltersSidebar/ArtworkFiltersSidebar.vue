<template>
	<div
		class="flex w-96 flex-col border-r border-solid border-brand-gray-1 bg-white p-4"
	>
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

<script lang="ts" setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";

import CollapsibleAccordian from "@/components/Shared/CollapsibleAccordian.vue";
import ArtworkFiltersSidebarCategories from "@/components/ArtworkResults/ArtworkFiltersSidebar/ArtworkFiltersSidebarCategories.vue";
import ArtworkFiltersSidebarLocations from "@/components/ArtworkResults/ArtworkFiltersSidebar/ArtworkFiltersSidebarLocations.vue";
import ArtworkFiltersSidebarPrompt from "@/components/ArtworkResults/ArtworkFiltersSidebar/ArtworkFiltersSidebarPrompt.vue";
import ArtworkFiltersSidebarTags from "@/components/ArtworkResults/ArtworkFiltersSidebar/ArtworkFiltersSidebarTags.vue";

import { useUserStore } from "@/stores/user";

const route = useRoute();
const userStore = useUserStore();

const parseTagsSeachTerm = () => {
	const tag = (route.query.tag as string) || "";
	userStore.UPDATE_TAGS_SEARCH_TERM(tag);
};

onMounted(parseTagsSeachTerm);
</script>
