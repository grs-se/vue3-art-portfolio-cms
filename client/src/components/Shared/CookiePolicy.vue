<template>
	<div>
		<h1>Cookie Policy</h1>
		<div>
			<h2>This site uses cookies for Google Analytics, you can disable it here:</h2>
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
