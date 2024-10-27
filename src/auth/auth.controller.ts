import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post()
    login(): Promise<{}> {
        return this.authService.login();
    }

    @Post()
    register(): Promise<{}> {
        return this.authService.login();
    }
}