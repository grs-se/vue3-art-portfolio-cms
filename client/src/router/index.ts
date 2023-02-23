import { createRouter, createWebHashHistory } from "vue-router";

// import { trackRouter } from "vue-gtag-next";

import ArtistStatementView from "@/views/ArtistStatementView.vue";
import ArtworkResultsView from "@/views/ArtworkResultsView.vue";
import ArtworkView from "@/views/ArtworkView.vue";
import HomeView from "@/views/HomeView.vue";
// import GalleryView from "@/views/GalleryView.vue";
import CookiePolicy from "@/components/Shared/CookiePolicy.vue";
import ResearchView from "@/views/ResearchView.vue";
import TextResultsView from "@/views/TextResultsView.vue";
import TextView from "@/views/TextView.vue";
import LoginRegisterView from "@/views/LoginRegisterView.vue";

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
		name: "TextResults",
		component: TextResultsView,
	},
	{
		path: "/text/:id",
		name: "TextListing",
		component: TextView,
	},
	{
		path: "/LoginRegister",
		name: "LoginRegister",
		component: LoginRegisterView,
	},
	{
		path: "/cookiesPolicy",
		name: "CookiePolicy",
		component: CookiePolicy,
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
	scrollBehavior() {
		return { top: 0, left: 0, behavior: "smooth" };
	},
});

// trackRouter(router);

export default router;
