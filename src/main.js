import { createApp } from "vue";
import { createPinia } from "pinia";
import Cloudinary from "cloudinary-vue";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import "@/index.css";
import router from "@/router";
import App from "@/App.vue";

library.add(faSearch);

const pinia = createPinia();

createApp(App)
	.use(pinia)
	.use(router)
	.use(Cloudinary, {
		configuration: {
			cloudName: "grs-gallery",
			secure: true,
		},
	})
	.component("font-awesome-icon", FontAwesomeIcon)
	.mount("#app");
