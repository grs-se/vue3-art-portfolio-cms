// const state = [
// 	{
// 		data1: [
// 			{ obj1: { categories: "d" } },
// 			{ obj2: { categories: "3" } },
// 			{ obj3: { categories: "f" } },
// 			{ obj4: { categories: "c" } },
// 			{ obj5: { categories: "b" } },
// 			{ obj6: { categories: "a" } },
// 		],
// 	},
// 	{
// 		data2: [
// 			{ obj7: { categories: ["a", "b", "c"] } },
// 			{ obj8: { categories: ["b", "d", "e"] } },
// 			{ obj9: { categories: ["f", "a", "d"] } },
// 		],
// 	},
// 	{ selectedCategories: ["a", "3", "f"] },
// ];

// // console.log(state[2]);

// const filterCategories = function () {
// 	return state[0].filter((obj) => {
// 		state[2].includes(obj.categories);
// 		// console.log(obj);
// 	});
// };

// let filters = filterCategories();
// console.log(filters);
// // console.log(filters, "data 1");
// // filters = filterCategories(state.data2);
// // console.log(filters, "data 2");

// //////////////

// import { defineStore } from "pinia";
// import createSet from "@/utils/createSet.js";

// import getArtworks from "@/api/getArtworks";

// import { useUserStore } from "@/stores/user";

// export const FETCH_ARTWORKS = "FETCH_ARTWORKS";
// export const UNIQUE_CATEGORIES = "UNIQUE_CATEGORIES";
// export const FILTERED_ARTWORKS_BY_CATEGORIES =
// 	"FILTERED_ARTWORKS_BY_CATEGORIES";

// export const useArtworksStore = defineStore("artworks", {
// 	state: () => ({
// 		artworks: [],
// 	}),
// 	actions: {
// 		async [FETCH_ARTWORKS]() {
// 			const artworks = await getArtworks();
// 			this.artworks = artworks;
// 		},
// 	},
// 	getters: {
// 		[UNIQUE_CATEGORIES](state) {
// 			return createSet(state.artworks, "categories");
// 		},
// 		// 3 arrays: 1 = state.artworks 2. userStore.selectedCategories 3. state.artworks.categories
// 		// Filter state.artworks based on user's selectedCaterories.
// 		// Loop through an array of categories inside array fo artworks

// 		[FILTERED_ARTWORKS_BY_CATEGORIES](state) {
// 			const userStore = useUserStore();

// 			if (userStore.selectedCategories.length === 0) {
// 				return state.artworks;
// 			}

// 			console.log(userStore.selectedCategories);

// 			// const arrayCategories = function (data) {
// 			// 	data.categories.forEach((el) => el);
// 			// };

// 			// Loop through state.artworks
// 			// Loop through categories
// 			// Loop through selectedCategoris
// 			// If selectedCategories includes categories
// 			// Filter artworks

// 			return state.artworks.filter((artwork) =>
// 				artwork.categories.some((cat) =>
// 					userStore.selectedCategories.includes(cat)
// 				)
// 			);
// 		},

// 		// console.log(filteredArtworks);
// 		// },

// 		/*
// 			return state.artworks
// 				.map((artwork, i) => {
// 					const filteredCategories = artwork.filter((cat) =>
// 						userStore.selectedCategories.includes(cat)
// 					);
// 					return filteredCategories;
// 				})
// 				.filter((artwork) => userStore.selectedCategories.includes(artwork));
// 		},
// */
// 		/*
// 		// 	return state.artworks.filter((artwork, i) => {
// 		// 		// let arr = [];
// 		// 		artwork.categories.filter((cat) => {
// 		// 			userStore.selectedCategories.includes(cat);
// 		// 		});

// 		// 		// console.log(arr);
// 		// 		// userStore.selectedCategories.includes(artwork.categories);
// 		// 	});
// 		// },
// */
// 		// jobs.organization is
// 		// 	return state.artworks.filter((artwork, i) => {
// 		// 		// 		userStore.selectedCategories.includes(artwork.categories);
// 		// 		// 		console.log(artwork.categories);
// 		// 		// 	});
// 		// 		// },
// 		// 		// 			// console.log(artwork.categories);

// 		// 		let arr = [];
// 		// 		// const returnArrayCategories = function (data) {
// 		// 		artwork.categories.forEach((cat) => {
// 		// 			if (userStore.selectedCategories.includes(cat)) {
// 		// 				arr.push(cat);
// 		// 			}
// 		// 		});
// 		// 		// };
// 		// 		// returnArrayCategories(artwork);
// 		// 		// const { ...cats } = arr;
// 		// 		// const cats = arr.toString();
// 		// 		console.log(arr);
// 		// 		userStore.selectedCategories.includes(artwork.categories[arr]);
// 		// 	});
// 		// },
// 		// })

// 		// 		const returnArrayCategories = function (data) {
// 		// 			data.categories.forEach((el) => {
// 		// 				if (
// 		// 	};
// 		// 	console.log(returnArrayCategories(artwork));
// 		// 	return returnArrayCategories(artwork);
// 		// });

// 		// return state.artworks.filter((artwork) => {
// 		// 	const returnArrayCategories = function (data) {
// 		// 		data.categories.forEach((el) => {
// 		// 			if (userStore.selectedCategories.includes(el)) {
// 		// 				// console.log(artwork.categories);
// 		// 				// console.log(el);
// 		// 				// console.log(el);
// 		// 				return el;
// 		// 			}
// 		// 		});
// 		// 	};
// 		// 	console.log(returnArrayCategories(artwork));
// 		// 	return returnArrayCategories(artwork);

// 		// 	// let returnArray = returnArrayCategories(artwork);
// 		// 	// console.log(returnArray);
// 		// 	// userStore.selectedCategories.includes(returnArray);
// 		// });

// 		// console.log(userStore.selectedCategories);

// 		// return state.artworks.filter((artwork) => {
// 		// 	const returnArrayCategories = function (data) {
// 		// 		data.categories.forEach((el) => {
// 		// 			if (userStore.selectedCategories.includes(el)) {
// 		// 				// console.log(artwork.categories);
// 		// 				console.log(el);
// 		// 				// console.log(data);
// 		// 				return data;
// 		// 			}
// 		// 		});
// 		// 	};
// 		// 	userStore.selectedCategories.includes(returnArrayCategories(artwork));
// 		// });
// 		// */
// 		/*
// 			return state.artworks.filter((artwork) => {
// 				artwork.categories.forEach((el) => {
// 					if (userStore.selectedCategories.includes(el)) {
// 						console.log(el);
// 						return el;
// 					}
// 				});
// 				return artwork;
// 			});
// 			// */
// 		// /*

// 		/*
// 			// NOT WORKING
// 			const returnArrayCategories = function (data) {
// 				data.categories.forEach((el) => {
// 					userStore.selectedCategories.includes(el);
// 					// console.log(data.categories);
// 					// console.log(data);
// 					console.log(data);
// 					return el, data;
// 				});
// 			};

// 			return state.artworks.filter((artwork) => {
// 				userStore.selectedCategories.includes(returnArrayCategories(artwork));
// 				// console.log();
// 			});
// 			*/
// 		// console.log(array);
// 		// return array;
// 		// };

// 		// */

// 		// /*

// 		// const returnCategoriesFromArray = function (data) {
// 		// 	return data.categories.forEach((el) => {
// 		// 		if (userStore.selectedCategories.includes(el)) {
// 		// 			// console.log(data.categories);
// 		// 			console.log(data);
// 		// 			console.log(el);
// 		// 			return el, data;
// 		// 		}
// 		// 	});
// 		// };

// 		// return state.artworks.filter((artwork) => {
// 		// 	userStore.selectedCategories.includes(
// 		// 		returnCategoriesFromArray(artwork)
// 		// 	);
// 		// 	console.log();
// 		// });

// 		// */

// 		/*
// 			return state.artworks.filter((artwork) => {
// 				artwork.categories.forEach((el) => {
// 					if (userStore.selectedCategories.includes(el)) {
// 						// console.log(artwork.categories);
// 						console.log(artwork);
// 						return artwork;
// 					}
// 				});
// 			});
// 			// */

// 		// /*
// 		// return state.artworks.filter((artwork) => {
// 		// 	userStore.selectedCategories.includes(artwork.categories);
// 		// 	console.log(artwork.categories);
// 		// });
// 		// /*

// 		/*
// 			return state.artworks.filter((artwork) => {
// 				userStore.selectedCategories.includes(
// 					artwork.categories.forEach((el) => {
// 						console.log(el);
// 						return el;
// 					})
// 				);
// 			});
// 			*/

// 		// const artworksFilter = state.artworks.filter((artwork) => {
// 		// 	artwork.categories;
// 		// });

// 		// const handleCallback = (childData) => {
// 		// 	state.artworks.filter((artwork) =>
// 		// 		userStore.selectedCategories.includes()
// 		// 	);
// 		// };

// 		// const parentCallback = () => {};

// 		// state.artworks.

// 		// const filter = (data1, data2) => {data1.filter((obj) => {
// 		// 	obj.
// 		// })}

// 		// if (userStore.selectedCategories.includes(state.artworks.categories))
// 		// 	return;

// 		// if (state.artworks.includes(userStore.selectedCategories)) {
// 		// 	return state.artworks;
// 		// }

// 		// return state.artworks.filter((artwork) => {
// 		// 	// artwork.categories.includes(userStore.selectedCategories);
// 		// 	userStore.selectedCategories.includes(
// 		// 		artwork.categories.some((i) => i)
// 		// 	);
// 		// });

// 		// return state.artworks.filter((artwork) => {
// 		// 	const categories = artwork.categories.forEach((el) => console.log(el));
// 		// 	userStore.selectedCategories.includes(categories);
// 		// 	console.log(categories);
// 		// });

// 		// userStore.selectedCategories.includes(categories);

// 		// return state.artworks.filter((artwork) => {
// 		// 	userStore.selectedCategories.includes(
// 		// 		artwork.categories.forEach((cat) => {
// 		// 			console.log(cat);
// 		// 			return cat;
// 		// 		})
// 		// 	);

// 		// const cats = [...artwork.categories];
// 		// console.log(cats);
// 		// userStore.selectedCategories.includes(cats);
// 	},
// });
