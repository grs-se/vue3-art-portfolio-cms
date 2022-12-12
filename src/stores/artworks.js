import { defineStore } from "pinia";
import createSet from "@/utils/createSet.js";

import getArtworks from "@/api/getArtworks";

import { useUserStore } from "@/stores/user";

export const FETCH_ARTWORKS = "FETCH_ARTWORKS";
export const UNIQUE_CATEGORIES = "UNIQUE_CATEGORIES";
export const FILTERED_ARTWORKS_BY_CATEGORIES =
	"FILTERED_ARTWORKS_BY_CATEGORIES";

export const useArtworksStore = defineStore("artworks", {
	state: () => ({
		artworks: [],
	}),
	actions: {
		async [FETCH_ARTWORKS]() {
			const artworks = await getArtworks();
			this.artworks = artworks;
		},
	},
	getters: {
		[UNIQUE_CATEGORIES](state) {
			return createSet(state.artworks, "categories");
		},
		// Filter state.artworks based on user's selectedCaterories.
		// Loop through an array of categories inside array fo artworks
		[FILTERED_ARTWORKS_BY_CATEGORIES](state) {
			const userStore = useUserStore();

			if (userStore.selectedCategories.length === 0) {
				return state.artworks;
			}

			// console.log(userStore.selectedCategories);

			/*
			return state.artworks.filter((artwork) => {
				const returnArrayCategories = function (data) {
					data.categories.forEach((el) => {
						if (userStore.selectedCategories.includes(el)) {
							// console.log(artwork.categories);
							console.log(el);
							// console.log(data);
							return data;
						}
					});
				};
				userStore.selectedCategories.includes(returnArrayCategories(artwork));
			});
			// */
			/*
			return state.artworks.filter((artwork) => {
				artwork.categories.forEach((el) => {
					if (userStore.selectedCategories.includes(el)) {
						console.log(el);
						return el;
					}
				});
				return artwork;
			});
			// */
			// /*

			const returnArrayCategories = function (data) {
				data.categories.forEach((el) => {
					if (userStore.selectedCategories.includes(el)) {
						// console.log(data.categories);
						console.log(data);
						console.log(el);
						return el, data;
					}
				});
			};

			return state.artworks.filter((artwork) => {
				userStore.selectedCategories.includes(returnArrayCategories(artwork));
				console.log();
			});

			// */

			/*
			return state.artworks.filter((artwork) => {
				artwork.categories.forEach((el) => {
					if (userStore.selectedCategories.includes(el)) {
						// console.log(artwork.categories);
						console.log(artwork);
						return artwork;
					}
				});
			});
			// */

			// /*
			// return state.artworks.filter((artwork) => {
			// 	userStore.selectedCategories.includes(artwork.categories);
			// 	console.log(artwork.categories);
			// });
			// /*

			/*
			return state.artworks.filter((artwork) => {
				userStore.selectedCategories.includes(
					artwork.categories.forEach((el) => {
						console.log(el);
						return el;
					})
				);
			});
			*/

			// const artworksFilter = state.artworks.filter((artwork) => {
			// 	artwork.categories;
			// });

			// const handleCallback = (childData) => {
			// 	state.artworks.filter((artwork) =>
			// 		userStore.selectedCategories.includes()
			// 	);
			// };

			// const parentCallback = () => {};

			// state.artworks.

			// const filter = (data1, data2) => {data1.filter((obj) => {
			// 	obj.
			// })}

			// if (userStore.selectedCategories.includes(state.artworks.categories))
			// 	return;

			// if (state.artworks.includes(userStore.selectedCategories)) {
			// 	return state.artworks;
			// }

			// return state.artworks.filter((artwork) => {
			// 	// artwork.categories.includes(userStore.selectedCategories);
			// 	userStore.selectedCategories.includes(
			// 		artwork.categories.some((i) => i)
			// 	);
			// });

			// return state.artworks.filter((artwork) => {
			// 	const categories = artwork.categories.forEach((el) => console.log(el));
			// 	userStore.selectedCategories.includes(categories);
			// 	console.log(categories);
			// });

			// userStore.selectedCategories.includes(categories);

			// return state.artworks.filter((artwork) => {
			// 	userStore.selectedCategories.includes(
			// 		artwork.categories.forEach((cat) => {
			// 			console.log(cat);
			// 			return cat;
			// 		})
			// 	);

			// const cats = [...artwork.categories];
			// console.log(cats);
			// userStore.selectedCategories.includes(cats);
		},
	},
});
