<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { ActionButton } from "@/components/Shared";

import { useAlertStore } from "@/stores";

const alertStore = useAlertStore();
const { alert } = storeToRefs(alertStore);
</script>

<template>
	<div v-if="alert" :class="alert.type">
		<div
			class="alert flex w-full items-center justify-end rounded-md py-1 px-1"
		>
			<span class="mx-3">{{ alert.message }}</span>
			<ActionButton
				:class="alert.type"
				@click="alertStore.clear()"
				class="btn-close"
			>
				&times;
			</ActionButton>
		</div>
	</div>
</template>

<style scoped>
.alert {
	@apply bg-red-50;
}
.alert-dismissable {
	@apply rounded-md bg-red-50;
}

/* .btn-close {
	@apply p-1;
} */

/* .alert-danger {
	@apply ;
} */
</style>
