import axios from "axios";
import { login, logout } from './auth_api/authSlice'

let axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    headers: {
        accept: 'application/json'
    }
})

const setupInterceptors = (store) => {
    const API_URL = "http://127.0.0.1:8000/api/";

    axiosInstance.interceptors.request.use(
        (request) => {
            if (request.url !== API_URL + "token/obtain/" && request.url !== API_URL + "token/refresh/" && request.url !== API_URL + "signup/") {
                // console.log("intercepted request :-) ", request.url, store.getState().auth.user.access)
                // setting auth headers only if we are not trying to get tokens
                request.headers['Authorization'] = "JWT " + store.getState().auth.user.access
            }
            return request
        },
        (error) => {
            return Promise.reject(error)
        }
    )

    axiosInstance.interceptors.response.use(
        (res) => {
            console.log("intercepting :=)")
            return res
        },
        async (err) => {
            const originalConfig = err.config

            if (originalConfig.url === API_URL + "token/refresh/" && err.response.status === 401) {
                // refresh token expired, so we attempt logout
                store.dispatch(logout())
            } else {
                if (originalConfig.url !== API_URL + "token/obtain/" && err.response) {
                    // access token expired
                    if (err.response.status === 401 && !originalConfig._retry) {
                        originalConfig._retry = true

                        const user = JSON.parse(localStorage.getItem("user"))

                        try {
                            const rs = await axios.post(API_URL + "token/refresh/", {
                                refresh: user.refresh
                            })

                            localStorage.setItem("user", JSON.stringify(rs.data))
                            err.config.headers.Authorization = "JWT " + rs.data.access
                            store.dispatch(login(rs.data))
                            // console.log(err.config)
                            return axios.request(err.config)
                        } catch (_error) {
                            return Promise.reject(_error)
                        }
                    }
                }
            }
            return Promise.reject(err)
        }
    )
}

export default axiosInstance
export { setupInterceptors }

// https://github.com/reduxjs/redux-toolkit/issues/687