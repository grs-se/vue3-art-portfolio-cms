<template>
	<div class="flex w-full flex-row flex-nowrap">
		<artwork-filters-sidebar />
		<artwork-gallery />
	</div>
</template>

<script lang="ts" setup>
import ArtworkGallery from "@/components/ArtworkResults/ArtworkGallery.vue";
import ArtworkFiltersSidebar from "@/components/ArtworkResults/ArtworkFiltersSidebar/ArtworkFiltersSidebar.vue";
</script>
