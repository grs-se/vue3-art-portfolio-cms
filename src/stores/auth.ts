import { ref } from "vue";
import { defineStore } from "pinia";

function checkTokenValidity(token) {
	if (token) {
		const decodedToken = jwt.decode(token);

		return decodedToken && decodedToken.exp * 1000 > new Date().getTime();
	}
}

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      user: {};
    }
  },
  actions: {
    init() {
      
    },
    registerUser(credentials){},
    loginUser(credentials){
      signInWithEmailAndPassword(auth, credentials.email, credentials.password).then((userCredential) => {
        const user = userCredential.user
        // console.log('user: ', user)
      }).catch((error) => {
        // console.log('error.message: ', error.message)
      })
    },
    }
  }
});

// () => {
// 	const isAuthenticated = ref({
// 		isLoggedIn: false,
// 		isAdmin: false,
// 		Token: null,
// 	});

// const SET_USER_AUTH = async(data) {
//   let newStatus = ref({
//     isLoggedIn: data.isLoggedIn,
//     isAdmin: data.isAdmin,
//     Token: data.Token
//   });
//   localStorage.setItem('Auth', JSON.stringify(newStatus));
// }

// const GET_USER_AUTH = async() {
//   if(localStorage.getItem('auth')) {
//     let AuthData = JSON.parse(localStorage.getItem('auth'));
//   }
// }
// });
