import axios from "axios";

const getTexts = async () => {
	const baseUrl = import.meta.env.VITE_APP_API_URL;
	const url = `${baseUrl}/text`;
	const response = await axios.get(url);
	return response.data.data.texts;
};

export default getTexts;
