export type AuthPayload = {
    sub: number,
    email: string,
}
export type RefreshAuthPayload = {
    sub: number,
    email: string,
    access_token: string
}  