import axios from "axios";

import type { User } from "@/api/types";

const getUsers = async () => {
	const baseUrl = import.meta.env.VITE_API_URL;
	const url = `${baseUrl}/users`;
	const response = await axios.get<User[]>(url);
	return response.data.data.users;
};

export default getUsers;
