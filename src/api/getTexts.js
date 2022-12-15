import axios from "axios";

const getTexts = async (params) => {
	const baseUrl = import.meta.env.VITE_APP_API_URL;
	const url = `${baseUrl}/text/${params}`;
	const response = await axios.get(url);
	return response.data.data.texts;
};

export default getTexts;
