<template>
	<div class="">Artwork View {{ currentArtworkId }}</div>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const currentArtworkId = computed(() => route.params.id);
</script>
