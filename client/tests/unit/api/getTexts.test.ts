import type { Mock } from "vitest";
import axios from "axios";

import getTexts from "@/api/getTexts";

vi.mock("axios");
const axiosGetMock = axios.get as Mock;

describe("getTexts", () => {
	beforeEach(() => {
		axiosGetMock.mockResolvedValue({
			data: {
				data: {
					texts: [{ id: 1, heading: "Essay", content: "Lorem Ipsum ..." }],
				},
			},
		});
	});

	it("fetches texts that user can read", async () => {
		await getTexts();
		expect(axios.get).toHaveBeenCalledWith("http://myfakeapi.com/text/");
	});

	// it("extracts texts from response", async () => {
	// 	const gallery = await getTexts();
	// 	expect(gallery).toEqual([{ id: 1, title: "Haberdashery" }]);
	// });
});
