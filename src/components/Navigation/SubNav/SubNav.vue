<script lang="ts" setup>
import {
	SubNavProductsCount,
	SubNavMenuItems,
} from "@/components/Navigation/SubNav";
</script>

<template>
	<div class="h-16 w-full border-b border-solid border-brand-gray-1 bg-white">
		<div class="flex h-full items-center px-8">
			<SubNavProductsCount />
			<SubNavMenuItems />
		</div>
	</div>
</template>
