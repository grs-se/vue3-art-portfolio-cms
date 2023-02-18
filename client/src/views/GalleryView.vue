<template>
	<div class="">Gallery page for artwork {{ currentArtworkId }}</div>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const currentArtworkId = computed(() => route.params.id);
</script>
