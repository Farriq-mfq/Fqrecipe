import { Only } from '@V1/decorators/only.decorator';
import { User } from '@V1/decorators/user.decorator';
import { Body, Controller, Get, Post, UseGuards, HttpCode, Header } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from './guard/auth.guard';
import { RefreshDto } from './dto/refresh.dto';
@Controller('auth')
export class AuthController {
    constructor(private AuthService: AuthService) { }

    @Only('email', 'password')
    @HttpCode(200)
    @Post("login")
    async login(@Body() LoginDto: LoginDto) {
        return await this.AuthService.loginService(LoginDto)
    }

    @Only('name', 'email', 'password')
    @Post("register")
    async register(@Body() RegisterDto: RegisterDto) {
        return await this.AuthService.registerService(RegisterDto)

    }

    @HttpCode(200)
    @Only('refresh_token')
    @UseGuards(AuthGuard)
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
    @Post('logout')
    async logout(@User() user: any) {
        return await this.AuthService.logoutService(user)
    }
}