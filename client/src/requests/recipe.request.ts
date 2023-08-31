import { AxiosResponse } from "axios"
import http from "../utils/http"

export type QueryRecipeRequest = {
    page?: number,
    perpage?: number
}

export const getPopulerRecipe = () => {

}
export const getRecipes = async (): Promise<AxiosResponse> => {
    return await http.get(`/recipes`)
    // return await http.get(`/recipes?page=${page ?? 1}&perpage=${perpage ?? 10}`)
}