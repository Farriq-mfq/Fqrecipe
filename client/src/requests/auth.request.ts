import { AxiosResponse } from 'axios';
import http from "../utils/http"

type PayloadSignIn = {
    email: string,
    password: string
}

// must be fix auth guard in global with one to one set autj guard on every contoller or handler / method
export const signInRequest = async ({ email, password }: PayloadSignIn): Promise<AxiosResponse> => {
    return await http.post('/auth/login', { email, password })
}