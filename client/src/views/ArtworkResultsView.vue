<template>
	<div class="flex w-full flex-nowrap xs:flex-col md:flex-row">
		<artwork-filters-sidebar />
		<artwork-gallery />
	</div>
	<!-- <div class="relative">
		<artwork-filters-sidebar class="w-50 fixed left-0 top-0" />
		<artwork-gallery />
	</div> -->
</template>

<script lang="ts" setup>
import { ArtworkGallery } from "@/components/ArtworkResults/ArtworkGallery";
import { ArtworkFiltersSidebar } from "@/components/ArtworkResults/ArtworkFiltersSidebar";
</script>
