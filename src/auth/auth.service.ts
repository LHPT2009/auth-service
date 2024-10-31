import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/entity/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userRepository: UserRepository,
    ) { }

    async login(loginDto: LoginDto): Promise<UserEntity> {
        const user = await this.userRepository.findOne({ where: { username: loginDto.username } });
        if (!user) {
            throw new NotFoundException(`User with username not found`)
        }
        return user;
    }

    async register(registerDto: RegisterDto): Promise<UserEntity> {
        const user = await this.userRepository.create(registerDto)
        return this.userRepository.save(user);
    }
}
