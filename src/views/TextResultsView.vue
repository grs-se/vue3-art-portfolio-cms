<template>
	<div class="flex w-full flex-row flex-nowrap">
		<text-filters-sidebar />
		<text-listings />
	</div>
</template>

<script lang="ts" setup>
import TextFiltersSidebar from "@/components/TextResults/TextFiltersSidebar/TextFiltersSidebar.vue";
import TextListings from "@/components/TextResults/TextListings.vue";
</script>
