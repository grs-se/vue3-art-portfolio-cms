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
				{ location: ["London", "Whitechapel"] },
				{ location: ["Paris", "France"] },
				{ location: ["Scotland", "Dumfries"] },
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

	describe("INCLUDE_ARTWORK_BY_CATEGORY", () => {
		describe("when the user has not selected any categories", () => {
			it("includes artwork", () => {
				const userStore = useUserStore();
				userStore.selectedCategories = [];
				const store = useArtworksStore();
				const artwork = { categories: ["Painting", "Imagination"] };

				const result = store.INCLUDE_ARTWORK_BY_CATEGORY(artwork);

				expect(result).toBe(true);
			});

			it("identifies if job is associated with given categories", () => {
				const userStore = useUserStore();
				userStore.selectedCategories = ["Painting", "Observation"];
				const store = useArtworksStore();
				const artwork = { categories: ["Painting", "Imagination"] };

				const result = store.INCLUDE_ARTWORK_BY_CATEGORY(artwork);

				expect(result).toBe(true);
			});
		});
	});

	describe("INCLUDE_ARTWORK_BY_LOCATION", () => {
		describe("when the user has not selected any location", () => {
			it("includes artwork", () => {
				const userStore = useUserStore();
				userStore.selectedLocations = [];
				const store = useArtworksStore();
				const artwork = { location: ["London", "Brick-Lane"] };

				const result = store.INCLUDE_ARTWORK_BY_LOCATION(artwork);

				expect(result).toBe(true);
			});

			it("identifies if job is associated with given location", () => {
				const userStore = useUserStore();
				userStore.selectedLocations = ["Belgium"];
				const store = useArtworksStore();
				const artwork = { location: ["Belgium"] };

				const result = store.INCLUDE_ARTWORK_BY_LOCATION(artwork);

				expect(result).toBe(true);
			});
		});
	});
});
