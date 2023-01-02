<template>
	<div class="flex w-full flex-nowrap xs:flex-col md:flex-row">
		<artwork-filters-sidebar />
		<artwork-gallery />
	</div>
</template>

<script lang="ts" setup>
import ArtworkGallery from "@/components/ArtworkResults/ArtworkGallery.vue";
import ArtworkFiltersSidebar from "@/components/ArtworkResults/ArtworkFiltersSidebar/ArtworkFiltersSidebar.vue";
</script>
