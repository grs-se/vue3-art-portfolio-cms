<template>
	<div
		class="flex w-96 flex-col border-r border-solid border-brand-gray-1 bg-white p-4"
	>
		<section class="pb-5">
			<div class="flex flex-row justify-between">
				<h3 class="my-4 text-base">Filter content</h3>
				<div class="flex items-center text-sm">
					<action-button text="Clear Filters" type="secondary" />
				</div>
			</div>

			<text-filters-sidebar-checkbox-group
				header="Categories"
				:unique-values="UNIQUE_TEXT_CATEGORIES"
				:action="userStore.ADD_SELECTED_TEXT_CATEGORIES"
			/>
		</section>
	</div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

import ActionButton from "@/components/Shared/ActionButton.vue";
import TextFiltersSidebarCheckboxGroup from "@/components/TextResults/TextFiltersSidebar/TextFiltersSidebarCheckboxGroup.vue";

import { useTextsStore } from "@/stores/texts";
import { useUserStore } from "@/stores/user";

const textsStore = useTextsStore();
const UNIQUE_TEXT_CATEGORIES = computed(
	() => textsStore.UNIQUE_TEXT_CATEGORIES
);

const userStore = useUserStore();
</script>
