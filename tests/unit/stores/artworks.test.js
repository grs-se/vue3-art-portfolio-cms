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
			axios.get.mockResolvedValue({ data: ["Artwork 1", "Artwork 2"] });
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
				{ categories: ["Painting", "Studio", "Painting"] },
				{ categories: ["Painting", "Studio", "Painting"] },
			];

			const result = store.UNIQUE_CATEGORIES;
			console.log(result);

			expect(result).toEqual(new Set(["Painting", "Studio"]));
		});
	});
	describe("FILTERED_ARTWORKS_BY_CATEGORIES", () => {
		it("identifies artworks that are associated with the given categories", () => {
			const artworksStore = useArtworksStore();
			artworksStore.artworks = [
				{ categories: ["Painting", "Studio", "Painting"] },
				{ categories: ["Painting", "Imagination", "Drawing"] },
				{ categories: ["Painting", "Studio", "Painting"] },
			];
			const userStore = useUserStore();
			userStore.selectedCategories = ["Painting", "Imagination"];

			const result = artworksStore.FILTERED_ARTWORKS_BY_CATEGORIES;

			expect(result).toEqual([{ categories: ["Painting", "Imagination"] }]);
		});
	});

	describe("when the user has not selected any artworks", () => {
		it("returns all artworks", () => {
			const artworksStore = useArtworksStore();
			artworksStore.artworks = [
				{ categories: ["Painting", "Studio"] },
				{ categories: ["Painting", "Studio"] },
			];
			const userStore = useUserStore();
			userStore.selectedArtworks = [];

			const result = artworksStore.FILTERED_ARTWORKS_BY_ARTWORKS;

			expect(result).toEqual([
				{ categories: ["Painting", "Studio"] },
				{ categories: ["Painting", "Studio"] },
				{ categories: ["Painting", "Studio"] },
			]);
		});
	});
});
