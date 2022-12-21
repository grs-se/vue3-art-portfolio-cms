import { createRouter, createWebHashHistory } from "vue-router";

import ArtistStatementView from "@/views/ArtistStatementView.vue";
import ArtworkResultsView from "@/views/ArtworkResultsView.vue";
import ArtworkView from "@/views/ArtworkView.vue";
import HomeView from "@/views/HomeView.vue";
// import GalleryView from "@/views/GalleryView.vue";
import ResearchView from "@/views/ResearchView.vue";
import TextResultsView from "@/views/TextResultsView.vue";

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
	{
		path: "/text",
		name: "Text",
		component: TextResultsView,
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
