import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express'
@Injectable()
export class AuthGuard implements CanActivate {
    private ACCESS_TOKEN_KEY: string
    private REFRESH_TOKEN_KEY: string
    constructor(private JwtService: JwtService, private ConfigService: ConfigService) {
        this.ACCESS_TOKEN_KEY = this.ConfigService.get('access_token_secret')
        this.REFRESH_TOKEN_KEY = this.ConfigService.get('refresh_token_secret')
    }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest() as Request
        const token = this.parseToken(request)

        try {
            const payload = await this.JwtService.verify(token, { secret: this.ACCESS_TOKEN_KEY })
            console.log(payload);
        } catch (e) {
            throw new UnauthorizedException(e.message)
        }

        return true;

    }

    private parseToken(request: Request): string {
        if (!('authorization' in request.headers)) throw new UnauthorizedException("please make sure authorization in headers")

        const [type, token] = request.headers.authorization.split(' ')

        if (type != 'Bearer') throw new UnauthorizedException("invalid token type")

        return token
    }
}