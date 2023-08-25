import { CanActivate, ExecutionContext, Injectable, BadRequestException } from '@nestjs/common'
import { Reflector } from '@nestjs/core';
import { Request } from 'express'
@Injectable()
export class OnlyGuard implements CanActivate {
    constructor(private reflector: Reflector) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const onlys = this.reflector.getAllAndOverride<string[]>('request_only', [
            context.getClass(),
            context.getHandler()
        ])

        if (onlys === undefined) return true

        const request = context.switchToHttp().getRequest() as Request

        const requestJsonKeys = Object.keys(request.body)
        if (!requestJsonKeys.length) throw new BadRequestException()

        const filter = requestJsonKeys.filter(req => !onlys.includes(req))

        const messages = filter.map(error => ({ error: `${error} not accepted, only ${Object.values(onlys)} accepted key` }))
        if (filter.length) throw new BadRequestException(messages)

        return true
    }
}