import type { Mock } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import axios from "axios";

import { useArtworksStore } from "@/stores/artworks";
import { useUserStore } from "@/stores/userMovements";
import { createArtwork } from "../../utils/createArtwork";

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
	beforeEach(() => {
		setActivePinia(createPinia());
	});

	describe("UNIQUE_ARTWORK_CATEGORIES", () => {
		it("finds unique categories from list of artworks", () => {
			const store = useArtworksStore();
			store.artworks = [
				createArtwork({ categories: ["Painting", "Studio", "Painting"] }),
				createArtwork({ categories: ["Painting", "Imagination", "Drawing"] }),
				createArtwork({ categories: ["Painting", "Studio", "Painting"] }),
			];

			const result = store.UNIQUE_ARTWORK_CATEGORIES;

			expect(result).toEqual(
				new Set(["Painting", "Studio", "Imagination", "Drawing"])
			);
		});
	});

	describe("UNIQUE_ARTWORK_LOCATIONS", () => {
		it("finds unique locations from list of artworks", () => {
			const store = useArtworksStore();
			store.artworks = [
				createArtwork({ location: ["London", "Whitechapel"] }),
				createArtwork({ location: ["Paris", "France"] }),
				createArtwork({ location: ["Scotland", "Dumfries"] }),
			];

			const result = store.UNIQUE_ARTWORK_LOCATIONS;

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
				userStore.selectedArtworkCategories = [];
				const store = useArtworksStore();
				const artwork = createArtwork({
					categories: ["Painting", "Imagination"],
				});

				const result = store.INCLUDE_ARTWORK_BY_CATEGORY(artwork);

				expect(result).toBe(true);
			});

			it("identifies if artwork is associated with given categories", () => {
				const userStore = useUserStore();
				userStore.selectedArtworkCategories = ["Painting", "Observation"];
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
				userStore.selectedArtworkLocations = [];
				const store = useArtworksStore();
				const artwork = createArtwork({ location: ["London", "Brick-Lane"] });

				const result = store.INCLUDE_ARTWORK_BY_LOCATION(artwork);

				expect(result).toBe(true);
			});

			it("identifies if artwork is associated with given location", () => {
				const userStore = useUserStore();
				userStore.selectedArtworkLocations = ["Belgium"];
				const store = useArtworksStore();
				const artwork = createArtwork({ location: ["Belgium"] });

				const result = store.INCLUDE_ARTWORK_BY_LOCATION(artwork);

				expect(result).toBe(true);
			});
		});
	});

	describe("INCLUDE_ARTWORK_BY_TAG", () => {
		it("identifies if artwork includes user's search term", () => {
			const userStore = useUserStore();
			userStore.tagsSearchTerm = "Archetype";
			const store = useArtworksStore();
			const artwork = createArtwork({ tags: ["Archetype"] });

			const result = store.INCLUDE_ARTWORK_BY_TAG(artwork);

			expect(result).toBe(true);
		});

		it("handles inconsistent character casing", () => {
			const userStore = useUserStore();
			userStore.tagsSearchTerm = "arcHeType";
			const store = useArtworksStore();
			const artwork = createArtwork({ tags: ["Archetype"] });

			const result = store.INCLUDE_ARTWORK_BY_TAG(artwork);

			expect(result).toBe(true);
		});

		describe("when the user has not entered any search term", () => {
			it("includes artwork", () => {
				const userStore = useUserStore();
				userStore.tagsSearchTerm = "";
				const store = useArtworksStore();
				const artwork = createArtwork({ tags: ["Archetype"] });

				const result = store.INCLUDE_ARTWORK_BY_TAG(artwork);

				expect(result).toBe(true);
			});
		});
	});
});
