<template>
	<MainNav />
	<RouterView />
	<FooterNav />
	<CookieBanner />
</template>

<script lang="ts" setup>
import { MainNav } from "@/components/Navigation/MainNav";
import { FooterNav } from "@/components/Footer";
import { CookieBanner } from "@/components/Shared";
</script>
