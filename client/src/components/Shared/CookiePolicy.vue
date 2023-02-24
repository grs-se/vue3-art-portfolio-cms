<template>
	<div class="flex flex-col items-center justify-center py-20">
		<h1 class="text-xl">Cookie Policy</h1>
		<div class="mt-4">
			<p>This site uses cookies for Google Analytics.</p>
			<br />
			<p>You can disable it here:</p>
			<input type="checkbox" v-model="allowCookies" />
		</div>
		<!-- 
        https://www.cookiepolicygenerator.com/cookie-policy-generator/ 
        use this to generate your policy and paste here the result
    -->
	</div>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
import useCookies from "@/composables/useCookies";

export default defineComponent({
	setup() {
		const gtag = inject<any>("gtag");
		const { allowCookies } = useCookies(gtag);
		return {
			allowCookies,
		};
	},
});
</script>
