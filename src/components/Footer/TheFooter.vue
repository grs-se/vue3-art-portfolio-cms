<template>
	<section class="w-full bg-gray-900 text-white">
		<div class="mx-auto py-16 text-start sm:w-3/4 xl:w-1/2">
			<div class="footer-row-group">
				<div
					class="mx-auto grid grid-cols-12 border-b border-solid border-b-brand-gray-1"
				>
					<div
						v-for="menuGroup in footerMenuGroups"
						:key="menuGroup.header"
						class="col-span-4 mr-8"
					>
						<div class="pb-6">
							<router-link
								:to="menuGroup.url"
								class="text-xl hover:text-brand-blue-2"
								>{{ menuGroup.header }}
							</router-link>
						</div>
						<div class="pb-10 text-sm">
							<router-link
								v-for="listItem in menuGroup.listItems"
								:key="listItem.item"
								:to="listItem.url"
								class="flex py-1 hover:text-brand-blue-2"
								>{{ listItem.item }}
							</router-link>
						</div>
					</div>
				</div>
			</div>

			<div class="footer-row-group">
				<div class="flex justify-between pt-10 text-xs">
					<div class="mr-8">
						<p>All content copyright George Rice-Smith, 2023</p>
					</div>
					<div class="">
						<p>Website built and designed by GRS Art Web-Design</p>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
import { ref } from "vue";

const footerMenuGroups = ref([
	{
		header: "Contact",
		url: "/",
		listItems: [
			{
				item: "Please feel free to contact with enquiries:",
				url: "/gallery",
			},
		],
	},
	{
		header: "Services",
		url: "/",
		listItems: [
			{ item: "Art Teaching", url: "/gallery", link: true },
			{ item: "Art Technical", url: "/gallery", link: true },
			{ item: "Web-Development", url: "/gallery", link: true },
			{ item: "Landscape Construction", url: "/gallery", link: true },
		],
	},
	{
		header: "Products",
		url: "/",
		listItems: [
			{ item: "Print", url: "/gallery" },
			{ item: "NFT", url: "/gallery" },
			{ item: "Objects", url: "/gallery" },
		],
	},
]);
</script>
