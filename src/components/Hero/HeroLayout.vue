<template>
	<section class="pt-10 sm:pb-0 lg:pb-20">
		<div class="sm:flex sm:flex-col xl:grid xl:grid-cols-12">
			<div class="col-span-2 col-start-1"></div>
			<div class="col-span-3 col-start-3 self-center xs:px-8 xs:pb-8 md:px-0">
				<slot></slot>
			</div>

			<slot name="hero-image"></slot>

			<div class="col-span-1 col-start-12"></div>
		</div>
	</section>
</template>
