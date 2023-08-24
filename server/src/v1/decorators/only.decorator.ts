import { SetMetadata } from '@nestjs/common'
export const Only = (...only: string[]) => {
    return SetMetadata('request_only', only)
}