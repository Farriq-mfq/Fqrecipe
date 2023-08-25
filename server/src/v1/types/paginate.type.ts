export interface PaginateMeta {
    total: number
    lastPage: number
    currentPage: number
    perPage: number
    prev: number | null
    next: number | null

}
export interface Paginate<T> {
    data: T[],
    meta: PaginateMeta
}
export interface PaginateOptions {
    perPage: number,
    page: number
}

export type PaginateFunction = <T, A>(model: any, args?: A) => Promise<Paginate<T>>

