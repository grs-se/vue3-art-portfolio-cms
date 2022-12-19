import { createRouter, createWebHashHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
// import GalleryView from "@/views/GalleryView.vue";
import ArtworkResultsView from "@/views/ArtworkResultsView.vue";
import ArtworkView from "@/views/ArtworkView.vue";
import ArtistStatementView from "@/views/ArtistStatementView.vue";
import ResearchView from "@/views/ResearchView.vue";

const routes = [
	{
		path: "/",
		name: "Home",
		component: HomeView,
	},
	// {
	// 	path: "/gallery",
	// 	name: "GalleryView",
	// 	component: GalleryView,
	// },
	{
		path: "/gallery",
		name: "ArtworkResults",
		component: ArtworkResultsView,
	},
	{
		path: "/gallery/artworks/results/:id",
		name: "ArtworkListing",
		component: ArtworkView,
	},
	{
		path: "/text/artist-statement",
		name: "ArtistStatement",
		component: ArtistStatementView,
	},
	{
		path: "/research",
		name: "Research",
		component: ResearchView,
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
	scrollBehavior() {
		return { top: 0, left: 0, behavior: "smooth" };
	},
});

export default router;
