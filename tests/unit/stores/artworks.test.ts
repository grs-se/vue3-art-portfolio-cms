import type { Mock } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import axios from "axios";

import type { Artwork } from "@/api/types";
import { useArtworksStore } from "@/stores/artworks";
import { useUserStore } from "@/stores/user";

vi.mock("axios");
const axiosGetMock = axios.get as Mock;

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
			axiosGetMock.mockResolvedValue({
				data: { data: { artworks: ["Artwork 1", "Artwork 2"] } },
			});
			const store = useArtworksStore();
			await store.FETCH_ARTWORKS();
			expect(store.artworks).toEqual(["Artwork 1", "Artwork 2"]);
		});
	});
});

describe("getters", () => {
	const createArtwork = (artwork: Partial<Artwork> = {}): Artwork => ({
		title: "Artwork",
		medium: ["Coloured Chalks", "Coloured Chalks on Paper"],
		imageCover: "artwork.jpg",
		date: "2022-11-12",
		description: "lorem ipsum",
		dimensions: {
			height: { px: 2653, cm: 0 },
			width: { px: 3638, cm: 0 },
			depth: { px: 0, cm: 0 },
		},
		sales: { price: 475 },
		location: ["North Pole", "Jamaica"],
		categories: ["a", "b", "c"],
		tags: ["art", "painting"],
		...artwork,
	});

	beforeEach(() => {
		setActivePinia(createPinia());
	});

	describe("UNIQUE_CATEGORIES", () => {
		it("finds unique categories from list of artworks", () => {
			const store = useArtworksStore();
			store.artworks = [
				createArtwork({ categories: ["Painting", "Studio", "Painting"] }),
				createArtwork({ categories: ["Painting", "Imagination", "Drawing"] }),
				createArtwork({ categories: ["Painting", "Studio", "Painting"] }),
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
				createArtwork({ location: ["London", "Whitechapel"] }),
				createArtwork({ location: ["Paris", "France"] }),
				createArtwork({ location: ["Scotland", "Dumfries"] }),
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
				const artwork = createArtwork({
					categories: ["Painting", "Imagination"],
				});

				const result = store.INCLUDE_ARTWORK_BY_CATEGORY(artwork);

				expect(result).toBe(true);
			});

			it("identifies if job is associated with given categories", () => {
				const userStore = useUserStore();
				userStore.selectedCategories = ["Painting", "Observation"];
				const store = useArtworksStore();
				const artwork = createArtwork({
					categories: ["Painting", "Imagination"],
				});

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
				const artwork = createArtwork({ location: ["London", "Brick-Lane"] });

				const result = store.INCLUDE_ARTWORK_BY_LOCATION(artwork);

				expect(result).toBe(true);
			});

			it("identifies if job is associated with given location", () => {
				const userStore = useUserStore();
				userStore.selectedLocations = ["Belgium"];
				const store = useArtworksStore();
				const artwork = createArtwork({ location: ["Belgium"] });

				const result = store.INCLUDE_ARTWORK_BY_LOCATION(artwork);

				expect(result).toBe(true);
			});
		});
	});
});
