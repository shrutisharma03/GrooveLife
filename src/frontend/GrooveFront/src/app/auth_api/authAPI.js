import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/";

class AuthService {
    async signin(email, password) {
        const response = await axios
            .post(API_URL + "token/obtain/", { email, password });
        if (response.data.access) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
    }

    logout() {
        localStorage.removeItem("user");
        localStorage.removeItem("queue");
    }

    async signup(username, email, password) {
        const response = await axios.post(API_URL + "user/create/", {
            username,
            email,
            password,
        });
        console.log(response.data)
        return response.data
    }
}

export default new AuthService();