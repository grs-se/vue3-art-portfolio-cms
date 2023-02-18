import type { Mock } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import axios from "axios";

import { useTextsStore } from "@/stores/texts";
import { useUserStore } from "@/stores/userMovements";
import { createText } from "../../utils/createText";

vi.mock("axios");
const axiosGetMock = axios.get as Mock;

describe("state", () => {
	beforeEach(() => {
		setActivePinia(createPinia());
	});

	it("stores all texts", () => {
		const store = useTextsStore();
		expect(store.texts).toEqual([]);
	});
});

describe("actions", () => {
	beforeEach(() => {
		setActivePinia(createPinia());
	});

	describe("FETCH_TEXTS", () => {
		it("makes API request and stores received texts", async () => {
			axiosGetMock.mockResolvedValue({
				data: { data: { texts: [{ heading: "Essay" }] } },
			});
			const store = useTextsStore();
			await store.FETCH_TEXTS();

			expect(store.texts).toEqual([{ heading: "Essay" }]);
		});
	});

	describe("getters", () => {
		beforeEach(() => {
			setActivePinia(createPinia());
		});

		describe("UNIQUE_TEXT_CATEGORIES", () => {
			it("finds unique texts from collection of texts", () => {
				const store = useTextsStore();
				store.texts = [
					createText({
						categories: ["Essay", "Fiction"],
					}),
					createText({
						categories: ["Diary", "Night-time"],
					}),
				];

				const result = store.UNIQUE_TEXT_CATEGORIES;

				expect(result).toEqual(
					new Set(["Essay", "Fiction", "Diary", "Night-time"])
				);
			});
		});
	});
});

describe("INCLUDE_TEXT_BY_CATEGORY", () => {
	describe("when the user has not selected any categories", () => {
		it("includes text", () => {
			const userStore = useUserStore();
			userStore.selectedTextCategories = [];
			const store = useTextsStore();
			const text = createText({
				categories: ["essay", "fiction"],
			});

			const result = store.INCLUDE_TEXT_BY_CATEGORY(text);

			expect(result).toBe(true);
		});

		it("identifies if artwork is associated with given categories", () => {
			const userStore = useUserStore();
			userStore.selectedTextCategories = ["essay", "fiction"];
			const store = useTextsStore();
			const text = createText({
				categories: ["fiction", "dream"],
			});

			const result = store.INCLUDE_TEXT_BY_CATEGORY(text);

			expect(result).toBe(true);
		});
	});
});
