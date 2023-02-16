import { defineStore } from "pinia";

import { fetchWrapper } from "@/helpers";
import { useAuthStore } from "@/stores";

const baseUrl = `${import.meta.env.VITE_API_URL}/users`;

export const REGISTER_USER = "REGISTER_USER";
export const FETCH_USERS = "FETCH_USERS";
export const FETCH_USER = "FETCH_USER";
export const UPDATE_USER = "UPDATE_USER";
export const DELETE_USER = "DELETE_USER";

export const useUsersStore = defineStore({
	id: "users",
	state: () => ({
		users: [],
		user: {},
	}),
	actions: {
		async [REGISTER_USER](user) {
			await fetchWrapper.post(`${baseUrl}/register`, user);
		},
		async [FETCH_USERS]() {
			this.users = { loading: true };
			try {
				this.users = await fetchWrapper.get(baseUrl);
			} catch (error) {
				this.users = { error };
			}
		},
		async [FETCH_USER](id) {
			this.user = { loading: true };
			try {
				this.user = await fetchWrapper.get(`${baseUrl}/${id}`);
			} catch (error) {
				this.user = { error };
			}
		},
		async [UPDATE_USER](id, params) {
			await fetchWrapper.put(`${baseUrl}/${id}`, params);

			// update stored user if the logged in user updated their own record
			const authStore = useAuthStore();
			if (id === authStore.user.id) {
				// update local storage
				const user = { ...authStore.user, ...params };
				localStorage.setItem("user", JSON.stringify(user));

				// update auth user in pinia state
				authStore.user = user;
			}
		},
		async [DELETE_USER](id) {
			// add isDeleting prop to user being deleted
			this.users.find((x) => x.id === id).isDeleting = true;

			await fetchWrapper.delete(`${baseUrl}/${id}`);

			// remove user from list after deleted
			this.users = this.users.filter((x) => x.id !== id);

			// auto logout if the logged in user deleted their own record
			const authStore = useAuthStore();
			if (id === authStore.user.id) {
				authStore.logout();
			}
		},
	},
});
