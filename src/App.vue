<template>
	<main-nav />
	<router-view />
	<the-footer />
</template>

<script>
import MainNav from "@/components/Navigation/MainNav.vue";
import TheFooter from "@/components/Footer/TheFooter.vue";

export default {
	name: "App",
	components: {
		MainNav,
		TheFooter,
	},
};
</script>
