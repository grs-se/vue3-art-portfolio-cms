<template>
	<div id="artist-statement-wrapper" class="h-full w-full bg-brand-gray-2">
		<div class="h-10"></div>
		<section class="mx-auto flex w-1/2 flex-nowrap rounded-md border bg-white">
			<div class="mx-auto px-12 py-10">
				<p>{{ artistStatement.content }}</p>
			</div>
		</section>
		<div class="h-10"></div>
	</div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import axios from "axios";

interface ArtistStatement {
	content: string[];
}

const artistStatement = ref<ArtistStatement>({});

const getArtistStatement = async () => {
	const baseUrl = import.meta.env.VITE_API_URL;
	const url = `${baseUrl}/text/artist-statement`;
	const response = await axios.get<ArtistStatement>(url);
	artistStatement.value = response.data.data;
};

onMounted(getArtistStatement);
</script>
