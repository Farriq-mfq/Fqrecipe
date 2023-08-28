import { Only } from '@V1/decorators/only.decorator';
import { User } from '@V1/decorators/user.decorator';
import { Body, Controller, Get, HttpCode, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { RegisterDto } from './dto/register.dto';
import { Public } from '@V1/decorators/public.decorator';
import { Response } from 'express'
@Controller('auth')
export class AuthController {
    constructor(private AuthService: AuthService) { }

    @Public()
    @Only('email', 'password')
    @HttpCode(200)
    @Post("login")
    async login(@Body() LoginDto: LoginDto, @Res() res: Response) {
        const response = await this.AuthService.loginService(LoginDto)
        return res.setHeader('Authorization', response.access_token).json(response)
    }

    @Public()
    @Only('name', 'email', 'password')
    @Post("register")
    async register(@Body() RegisterDto: RegisterDto) {
        return await this.AuthService.registerService(RegisterDto)

    }

    @HttpCode(200)
    @Only('refresh_token')
    @Post('refresh')
    async refresh(@Body() RefreshDto: RefreshDto, @User() user: any) {
        return await this.AuthService.createRefreshToken(RefreshDto, user)
    }

    @Get('user')
    async currentUser(@User() user: any) {
        return user
    }

    @Post('logout')
    async logout(@User() user: any) {
        return await this.AuthService.logoutService(user)
    }
}