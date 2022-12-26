<template>
	<div>Text Page for text {{ currentTextId }}</div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const currentTextId = computed(() => route.params.id);
</script>
