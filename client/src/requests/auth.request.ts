import { AxiosResponse } from 'axios';
import http from "../utils/http"

export type PayloadSignIn = {
    email: string,
    password: string
}


export type PayloadSignUp = {
    name: string,
    email: string,
    password: string
}

export const signInRequest = async ({ email, password }: PayloadSignIn): Promise<AxiosResponse> => {
    return await http.post('/auth/login', { email, password })
}

export const signUpRequest = async ({ name, email, password }: PayloadSignUp): Promise<AxiosResponse> => {
    return await http.post('/auth/register', { name, email, password })
}

export const signOutRequest = async (): Promise<AxiosResponse> => {
    return await http.post('/auth/logout');
}