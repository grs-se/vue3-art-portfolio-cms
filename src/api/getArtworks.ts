import axios from "axios";

import type { Artwork } from "@/api/types";

const getArtworks = async () => {
	const baseUrl = import.meta.env.VITE_APP_API_URL;
	const url = `${baseUrl}/gallery`;
	const response = await axios.get<Artwork[]>(url);
	return response.data.data.artworks;
};

export default getArtworks;
