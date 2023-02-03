import { createApp } from "vue";
import { createPinia } from "pinia";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
	faAngleDown,
	faAngleUp,
	faSearch,
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

library.add(faAngleDown);
library.add(faAngleUp);
library.add(faSearch);

const pinia = createPinia();

createApp(App)
	.use(pinia)
	.use(router)
	.component("font-awesome-icon", FontAwesomeIcon)
	.mount("#app");
