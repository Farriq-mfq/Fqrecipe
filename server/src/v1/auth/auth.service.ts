import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';
import { PrismaService } from './../../../prisma/prisma.service';
import { AuthPayload } from './../types/authPayload.type';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RefreshDto } from './dto/refresh.dto';
import { users } from '@prisma/client';

export interface AuthTokenResponse { access_token: string, refresh_token: string }

@Injectable()
export class AuthService {
    private ACCESS_TOKEN_KEY: string
    private REFRESH_TOKEN_KEY: string
    constructor(private configService: ConfigService, private JwtService: JwtService, private PrismaService: PrismaService) {
        this.ACCESS_TOKEN_KEY = this.configService.get('access_token_secret')
        this.REFRESH_TOKEN_KEY = this.configService.get('refresh_token_secret')
    }
    async loginService(loginDto: LoginDto): Promise<AuthTokenResponse> {
        try {
            const validateUser = await this.PrismaService.users.findFirst({
                where: {
                    email: loginDto.email
                }
            })

            if (validateUser == null) throw new UnauthorizedException("invalid email or password")

            const checkPassword = await compare(loginDto.password, validateUser.password)

            if (!checkPassword) throw new UnauthorizedException("invalid email or password")

            return await this.createToken({
                sub: validateUser.id,
                email: validateUser.email
            })

        } catch (e) {
            if (e instanceof UnauthorizedException) {
                throw new UnauthorizedException(e.message)
            } else {
                throw new InternalServerErrorException()
            }
        }
    }

    async registerService(RegisterDto: RegisterDto): Promise<AuthTokenResponse> {
        try {
            const checkEmail = await this.PrismaService.users.findFirst({
                where: {
                    email: RegisterDto.email
                }
            })

            if (checkEmail != null) throw new BadRequestException("Email already exist")
            const hashPassword = await hash(RegisterDto.password, 10)
            if (!hashPassword.length) throw new BadRequestException()
            const register = await this.PrismaService.users.create({
                data: {
                    name: RegisterDto.name,
                    email: RegisterDto.email,
                    password: hashPassword
                }
            })

            if (!register) throw new BadRequestException()

            return await this.createToken({
                sub: register.id,
                email: register.email
            })
        } catch (e) {
            if (e instanceof BadRequestException) {
                throw new BadRequestException(e.message)
            } else {
                throw new InternalServerErrorException()
            }
        }
    }

    async createRefreshToken(RefreshDto: RefreshDto, user: users): Promise<AuthTokenResponse> {
        try {
            if (RefreshDto.refresh_token != user.refresh_token) throw new BadRequestException('invalid refresh token')
            const payload = await this.JwtService.verify(RefreshDto.refresh_token, { secret: this.REFRESH_TOKEN_KEY })
            const { access_token, refresh_token } = await this.createToken({ sub: payload.sub, email: payload.email })
            return {
                access_token,
                refresh_token
            }
        } catch (e) {
            if (e instanceof BadRequestException) {
                throw new BadRequestException(e.message)
            } else {
                throw new UnauthorizedException(e.message)
            }
        }
    }

    async logoutService(user: users): Promise<string> {
        try {
            const logout = await this.PrismaService.users.update({
                where: {
                    id: user.id
                },
                data: {
                    refresh_token: null
                }
            })

            if (!logout) throw new BadRequestException()

            return "succesfully logout"
        } catch (e) {
            if (e instanceof BadRequestException) {
                throw new BadRequestException(e.message)
            } else {
                throw new InternalServerErrorException()
            }
        }
    }

    private async createToken(payload: AuthPayload): Promise<AuthTokenResponse> {
        const access_token = await this.JwtService.sign(payload, { secret: this.ACCESS_TOKEN_KEY, expiresIn: '15m' });

        const refresh_token = await this.JwtService.sign({ ...payload, access_token }, { secret: this.REFRESH_TOKEN_KEY, expiresIn: '7d' })

        await this.PrismaService.users.update({
            data: {
                refresh_token
            },
            where: {
                id: payload.sub
            }
        })

        return {
            access_token,
            refresh_token
        }
    }
}