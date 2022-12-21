<template>
	<main-nav />
	<router-view />
	<the-footer />
</template>

<script lang="ts" setup>
import MainNav from "@/components/Navigation/MainNav.vue";
import TheFooter from "@/components/Footer/TheFooter.vue";
</script>
