import axios from "axios";

const http = axios.create({
    baseURL: 'http://localhost:4000/v1',
})

// http.interceptors.request.use(function (config) {
//     return config
// }, function (error) {
//     return Promise.reject(error)
// })

// http.interceptors.response.use(function (config) {
//     return config
// }, function (error) {
//     return Promise.reject(error)
// })


export default http

