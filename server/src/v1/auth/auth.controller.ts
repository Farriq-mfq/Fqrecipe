import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { Controller, Get, Post, UseGuards, Body } from '@nestjs/common'
import { AuthGuard } from './guard/auth.guard';
import { RegisterDto } from './dto/register.dto';
import { Only } from '@V1/decorators/only.decorator';
import { OnlyGuard } from '@V1/guards/only.guard';
@Controller('auth')
export class AuthController {
    constructor(private AuthService: AuthService) { }

    @UseGuards(OnlyGuard)
    @Only('email', 'password')
    @Post("login")
    async login(@Body() LoginDto: LoginDto) {
        return await this.AuthService.loginService(LoginDto)
    }

    @Only('email', 'password')
    @Post("register")
    async register(@Body() RegisterDto: RegisterDto) {
        // return await this.AuthService.registerService(RegisterDto)

    }

    @Post('refresh')
    async refresh() {
        return 'user refresh endpoint'

    }

    @UseGuards(AuthGuard)
    @Get('user')
    async currentUser() {
        return 'user currentuser endpoint'
    }
}