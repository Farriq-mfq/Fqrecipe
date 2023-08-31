import { Only } from '@V1/decorators/only.decorator';
import { User } from '@V1/decorators/user.decorator';
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from './guard/auth.guard';
@Controller('auth')
export class AuthController {
    constructor(private AuthService: AuthService) { }

    @Only('email', 'password')
    @HttpCode(200)
    @Post("login")
    async login(@Body() LoginDto: LoginDto, @Res() res: Response) {
        const response = await this.AuthService.loginService(LoginDto)
        return res.setHeader('Authorization', response.access_token).json(response)
    }

    @Only('name', 'email', 'password')
    @Post("register")
    async register(@Body() RegisterDto: RegisterDto) {
        return await this.AuthService.registerService(RegisterDto)

    }

    @UseGuards(AuthGuard)
    @HttpCode(200)
    @Only('refresh_token')
    @Post('refresh')
    async refresh(@Body() RefreshDto: RefreshDto, @User() user: any) {
        return await this.AuthService.createRefreshToken(RefreshDto, user)
    }

    @UseGuards(AuthGuard)
    @Get('user')
    async currentUser(@User() user: any) {
        return user
    }

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('logout')
    async logout(@User() user: any) {
        return await this.AuthService.logoutService(user)
    }
}