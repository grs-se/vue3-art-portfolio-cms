import axios from "axios";

import type { Text } from "@/api/types";

const getTexts = async (params: string = "") => {
	const baseUrl = import.meta.env.VITE_APP_API_URL;
	const url = `${baseUrl}/text/${params}`;
	const response = await axios.get<Text[]>(url);
	return response.data.data.texts;
};

export default getTexts;
