import axios, { AxiosError } from "axios";
import { AUTH_TOKEN_NAME, delete_cookie, getCookie } from "./cookie_parser";
const http = axios.create({
    baseURL: 'http://localhost:4000/v1',
})


const publicPath = [
    '/auth/login',
    '/auth/register'
]

http.interceptors.request.use(function (config) {
    const token = getCookie(AUTH_TOKEN_NAME)
    if (token.length) config.headers.Authorization = `Bearer ${token}`
    return config
}, function (error) {
    return Promise.reject(error)
})


http.interceptors.response.use(function (config) {
    return config
}, function (error: AxiosError) {
    if (!(publicPath.includes(window.location.pathname))) {
        if (error.response?.status === 401) {
            delete_cookie(AUTH_TOKEN_NAME)
            delete_cookie(`${AUTH_TOKEN_NAME}_state`)
            delete_cookie(`${AUTH_TOKEN_NAME}_storage`)
            delete_cookie(`${AUTH_TOKEN_NAME}_type`)
            window.location.href = "/auth/login"
        }
    }
    return Promise.reject(error)
})


export default http

