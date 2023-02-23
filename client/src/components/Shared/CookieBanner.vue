<template>
	<div class="container absolute bottom-0 rounded-md bg-white px-5 py-5">
		<transition name="slide">
			<div class="banner-container">
				<p>
					This site uses 🍪. For more details click
					<router-link to="cookiesPolicy" class="text-blue">here</router-link>
				</p>

				<button @click="okBannerClicked">OK</button>
			</div>
		</transition>
	</div>
</template>

<script lang="ts" setup>
import { inject } from "vue";
import useCookies from "@/composables/useCookies";

const gtag = inject<any>("gtag");
const { showBanner, okClicked } = useCookies(gtag);
const okBannerClicked = () => okClicked();
showBanner.value;
okBannerClicked;
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
	transition: opacity 0.5s;
}
.slide-enter,
.slide-leave-to {
	opacity: 0;
}
</style>
