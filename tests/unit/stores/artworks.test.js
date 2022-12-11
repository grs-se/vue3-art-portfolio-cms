import { createPinia, setActivePinia } from "pinia";
import axios from "axios";

import { useArtworksStore } from "@/stores/artworks";
import { vi } from "vitest";

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
				{ categories: "Google" },
				{ categories: "Amazon" },
				{ categories: "Google" },
			];

			const result = store.UNIQUE_CATEGORIES;

			expect(result).toEqual(new Set(["Painting", "Studio"]));
		});
	});
});
