import type { Mock } from "vitest";
import axios from "axios";

import getArtworks from "@/api/getArtworks";

vi.mock("axios");
const axiosGetMock = axios.get as Mock;

describe("getArtworks", () => {
	beforeEach(() => {
		axiosGetMock.mockResolvedValue({
			data: { data: { artworks: [{ id: 1, title: "Echo & Narcissus" }] } },
		});
	});

	it("fetches artworks that users can view", async () => {
		await getArtworks();
		expect(axios.get).toHaveBeenCalledWith("http://myfakeapi.com/gallery");
	});

	// it("extracts artworks from response", async () => {
	// 	const gallery = await getArtworks();
	// 	expect(gallery).toEqual([{ id: 1, title: "Echo & Narcissus" }]);
	// });
});
