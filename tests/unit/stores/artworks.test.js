import { createPinia, setActivePinia } from "pinia";
import axios from "axios";

import { useArtworksStore } from "@/stores/artworks";
import { useUserStore } from "@/stores/user";

vi.mock("axios");

describe("state", () => {
	beforeEach(() => {
		setActivePinia(createPinia());
	});

	it("stores artwork listings", () => {
		const store = useArtworksStore();
		expect(store.artworks).toEqual([]);
	});
});

describe("actions", () => {
	beforeEach(() => {
		setActivePinia(createPinia());
	});

	describe("FETCH_ARTWORKS", () => {
		it("makes API request and stores received artworks", async () => {
			axios.get.mockResolvedValue({
				data: { data: { artworks: ["Artwork 1", "Artwork 2"] } },
			});
			const store = useArtworksStore();
			await store.FETCH_ARTWORKS();
			expect(store.artworks).toEqual(["Artwork 1", "Artwork 2"]);
		});
	});
});

describe("getters", () => {
	beforeEach(() => {
		setActivePinia(createPinia());
	});

	describe("UNIQUE_CATEGORIES", () => {
		it("finds unique categories from list of artworks", () => {
			const store = useArtworksStore();
			store.artworks = [
				{ categories: ["Painting", "Studio", "Painting"] },
				{ categories: ["Painting", "Imagination", "Drawing"] },
				{ categories: ["Painting", "Studio", "Painting"] },
			];

			const result = store.UNIQUE_CATEGORIES;

			expect(result).toEqual(
				new Set(["Painting", "Studio", "Imagination", "Drawing"])
			);
		});
	});

	describe("UNIQUE_LOCATIONS", () => {
		it("finds unique locations from list of artworks", () => {
			const store = useArtworksStore();
			store.artworks = [
				{ locations: ["London", "Whitechapel"] },
				{ locations: ["Paris", "France"] },
				{ locations: ["Scotland", "Dumfries"] },
			];

			const result = store.UNIQUE_LOCATIONS;

			expect(result).toEqual(
				new Set([
					"London",
					"Whitechapel",
					"Paris",
					"France",
					"Scotland",
					"Dumfries",
				])
			);
		});
	});

	describe("FILTERED_ARTWORKS_BY_CATEGORIES", () => {
		describe("when the user has not selected any artworks", () => {
			it("returns all artworks", () => {
				const artworksStore = useArtworksStore();
				artworksStore.artworks = [
					{ categories: ["Painting", "Studio"] },
					{ categories: ["Observation", "Print"] },
				];
				const userStore = useUserStore();
				userStore.selectedArtworks = [];

				const result = artworksStore.FILTERED_ARTWORKS_BY_CATEGORIES;

				expect(result).toEqual([
					{ categories: ["Painting", "Studio"] },
					{ categories: ["Observation", "Print"] },
				]);
			});
		});

		it("identifies artworks that are associated with the given categories", () => {
			const artworksStore = useArtworksStore();
			artworksStore.artworks = [
				{ categories: ["Painting", "Studio", "Portrait"] },
				{ categories: ["Painting", "Imagination", "Drawing"] },
				{ categories: ["Drawing", "Studio", "Plein Air"] },
			];
			const userStore = useUserStore();
			userStore.selectedCategories = ["Painting", "Imagination"];

			const result = artworksStore.FILTERED_ARTWORKS_BY_CATEGORIES;

			expect(result).toEqual([
				{ categories: ["Painting", "Studio", "Portrait"] },
				{ categories: ["Painting", "Imagination", "Drawing"] },
			]);
		});
	});

	describe("FILTERED_ARTWORKS_BY_LOCATIONS", () => {
		describe("when the user has not selected any artworks", () => {
			it("returns all artworks", () => {
				const artworksStore = useArtworksStore();
				artworksStore.artworks = [
					{ locations: ["Hampshire", "Alton"] },
					{ locations: ["London", "Whitechapel"] },
				];
				const userStore = useUserStore();
				userStore.selectedCategories = [];

				const result = artworksStore.FILTERED_ARTWORKS_BY_LOCATIONS;

				expect(result).toEqual([
					{ locations: ["Hampshire", "Alton"] },
					{ locations: ["London", "Whitechapel"] },
				]);
			});
		});

		it("identifies artworks that are associated with given locations", () => {
			const artworksStore = useArtworksStore();
			artworksStore.artworks = [
				{ locations: ["London", "Brick-Lane"] },
				{ locations: ["Hampshire"] },
			];
			const userStore = useUserStore();
			userStore.selectedLocations = ["Hampshire"];

			const result = artworksStore.FILTERED_ARTWORKS_BY_LOCATIONS;

			expect(result).toEqual([{ locations: ["Hampshire"] }]);
		});
	});
});
