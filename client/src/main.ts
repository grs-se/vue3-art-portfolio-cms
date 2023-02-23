import { createApp } from "vue";
import { createPinia } from "pinia";
import VueGtag from "vue-gtag";
import { VueCookieNext } from "vue-cookie-next";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
	faAngleDown,
	faAngleUp,
	faSearch,
	faUser,
} from "@fortawesome/free-solid-svg-icons";

// import { Cloudinary } from "@cloudinary/vue";

// Cloudinary.config({
// 	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
// 	api_key: process.env.CLOUDINARY_API_KEY,
// 	api_secret: process.env.CLOUDINARY_API_SECRET,
// });

import "@/index.css";
import router from "@/router";
import App from "@/App.vue";

library.add(faAngleDown, faAngleUp, faSearch, faUser);

const pinia = createPinia();

const app = createApp(App);
app.use(router);
app.use(VueCookieNext);
app.use(
	VueGtag,
	{
		config: { id: import.meta.env.VITE_GA_MEASUREMENT_ID },
	},
	router
);
app.use(pinia);
app.component("font-awesome-icon", FontAwesomeIcon);

app.provide("gtag", app.config.globalProperties.$gtag);

app.mount("#app");
