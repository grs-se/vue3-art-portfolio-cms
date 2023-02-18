import axios from "axios";

import type { User } from "@/api/types";

const postUsers = async () => {
	const baseUrl = import.meta.env.VITE_API_URL;
	const url = `${baseUrl}/users`;
	const response = await axios.post<User[]>(url);
	return response.data.data.users;
};

export default postUsers;
