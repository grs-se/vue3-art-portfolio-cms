<template>
	<MainNav />
	<RouterView />
	<FooterNav />
</template>

<script lang="ts" setup>
import { MainNav } from "@/components/Navigation/MainNav";
import { FooterNav } from "@/components/Footer";
</script>
