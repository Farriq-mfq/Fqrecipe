import { PaginateFunction, PaginateOptions } from "@V1/types/paginate.type";

export const toPaginate = (options: PaginateOptions): PaginateFunction => {

    return async (model, args: any = { where: undefined }) => {

        const page = Number(options.page ?? 1)
        const perPage = Number(options.perPage ?? 10)
        const skip = page > 0 ? perPage * (page - 1) : 0

        const [total, data] = await Promise.all([
            model.count({ where: args.where }),
            model.findMany({
                ...args,
                take: perPage,
                skip
            })
        ])

        const lastPage = Math.ceil(total / perPage)
        return {
            data,
            meta: {
                currentPage: page,
                lastPage,
                next: page < lastPage ? page + 1 : null,
                prev: page > 1 ? page - 1 : null,
                perPage,
                total
            }
        }
    }
}