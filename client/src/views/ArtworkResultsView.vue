<template>
	<!-- Layout Option 1: -->
	<div class="flex w-full flex-nowrap xs:flex-col md:flex-row">
		<artwork-filters-sidebar />
		<artwork-gallery /> -->
	</div>

	<!-- Layput Option 2: Activate for alternative layout -->
	<!-- <div class="relative">
		<artwork-filters-sidebar class="top-50 fixed left-0 z-50 h-full" />
		<artwork-gallery />
	</div> -->
</template>

<script lang="ts" setup>
import { ArtworkGallery } from "@/components/ArtworkResults/ArtworkGallery";
import { ArtworkFiltersSidebar } from "@/components/ArtworkResults/ArtworkFiltersSidebar";
</script>
