<template>
	<div
		class="flex w-96 flex-col border-r border-solid border-brand-gray-1 bg-white p-4"
	>
		<section class="pb-5">
			<div class="flex flex-row justify-between">
				<h3 class="my-4 text-base font-semibold">What do you want to do?</h3>
				<div class="flex items-center text-sm">
					<action-button text="Clear Filters" type="secondary" />
				</div>
			</div>
			<collapsible-accordian header="Date"
				><p>Placeholder</p></collapsible-accordian
			>
			<collapsible-accordian header="Medium">
				<div class="mt-5">
					<fieldset>
						<ul class="flex flex-row flex-wrap">
							<li class="h-8 w-1/2">
								<input id="Watercolor" type="checkbox" class="mr-3" />
								<label for="Watercolor">Watercolor</label>
							</li>
							<li class="h-8 w-1/2">
								<input id="Painting" type="checkbox" class="mr-3" />
								<label for="Painting">Painting</label>
							</li>
							<li class="h-8 w-1/2">
								<input id="Drawing" type="checkbox" class="mr-3" />
								<label for="Drawing">Drawing</label>
							</li>
							<li class="h-8 w-1/2">
								<input id="Sculpture" type="checkbox" class="mr-3" />
								<label for="Sculpture">Sculpture</label>
							</li>
						</ul>
					</fieldset>
				</div>
			</collapsible-accordian>
		</section>
	</div>
</template>

<script>
import ActionButton from "@/components/Shared/ActionButton.vue";
import CollapsibleAccordian from "@/components/Shared/CollapsibleAccordian.vue";

export default {
	name: "ArtworkFiltersSidebar",
	components: { ActionButton, CollapsibleAccordian },
};
</script>
