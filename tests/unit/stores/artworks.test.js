import { createPinia, setActivePinia } from "pinia";

import { useArtworksStore } from "@/stores/artworks";

describe("state", () => {
	beforeEach(() => {
		setActivePinia(createPinia());
	});

	it("stores artwork listings", () => {
		const store = useArtworksStore();
		expect(store.artworks).toEqual([]);
	});
});
