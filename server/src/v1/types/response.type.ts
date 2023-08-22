export interface ResponseSuccess {
    message: string,
    code: number,
    data: any,
}


export interface ResponseError {
    message: string,
    code: number,
    errors: any,
}