import { PrismaService } from './../../../../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express'
import { AuthPayload, RefreshAuthPayload } from '@V1/types/authPayload.type';
@Injectable()
export class AuthGuard implements CanActivate {
    private ACCESS_TOKEN_KEY: string
    private REFRESH_TOKEN_KEY: string
    constructor(private JwtService: JwtService, private ConfigService: ConfigService, private PrismaService: PrismaService) {
        this.ACCESS_TOKEN_KEY = this.ConfigService.get('access_token_secret')
        this.REFRESH_TOKEN_KEY = this.ConfigService.get('refresh_token_secret')
    }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest() as Request
        const token = this.parseToken(request)

        try {
            const payload: AuthPayload = await this.JwtService.verify(token, { secret: this.ACCESS_TOKEN_KEY })
            const user = await this.PrismaService.users.findUnique({
                where: {
                    id: payload.sub
                }
            })

            // check sub in db
            if (user == null) throw new UnauthorizedException()
            // check refresh_token not null
            if (user.refresh_token == null) throw new UnauthorizedException()

            const payloadRt: RefreshAuthPayload = await this.JwtService.verify(user.refresh_token, { secret: this.REFRESH_TOKEN_KEY })
            if (payloadRt.access_token != token) throw new UnauthorizedException()

            delete user.password
            request.user = user
        } catch (e) {
            throw new UnauthorizedException(e.message)
        }

        return true;

    }

    private parseToken(request: Request): string {
        if (!('authorization' in request.headers)) throw new UnauthorizedException()

        const [type, token] = request.headers.authorization.split(' ')

        if (type != 'Bearer') throw new UnauthorizedException()

        return token
    }
}