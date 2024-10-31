import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post()
    login(): Promise<{}> {
        return this.authService.login();
    }

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    register(createUserDto: CreateUserDto): Promise<{}> {
        return this.authService.register(createUserDto);
    }

    @Post()
    refreshAccesstoken(): Promise<{}> {
        return this.authService.refreshAccesstoken();
    }
}