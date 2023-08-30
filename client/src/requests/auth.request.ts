import { AxiosResponse } from 'axios';
import http from "../utils/http"

type PayloadSignIn = {
    email: string,
    password: string
}

export const signInRequest = async ({ email, password }: PayloadSignIn): Promise<AxiosResponse> => {
    return await http.post('/auth/login', { email, password })
}

export const signOutRequest = async (): Promise<AxiosResponse> => {
    return await http.post('/auth/logout');
}