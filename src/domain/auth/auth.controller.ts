import { Body, Controller, Post } from '@nestjs/common';
import { LoginRequestDto } from 'src/application/dto/login/login-request.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post()
    login(@Body() dto: LoginRequestDto) {
        return this.authService.login(dto.email, dto.senha);
    }
}
