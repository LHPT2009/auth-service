import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/user/user.repository';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userRepository: UserRepository,
    ) { }

    async login(loginDto: LoginDto): Promise<{}> {
        const user = await this.userRepository.findOne({ where: { username: loginDto.username } });
        if (!user) {
            throw new NotFoundException(`User with username not found`)
        }

        const passwordMatched = await bcrypt.compare(
            loginDto.password,
            user.password,
        );

        if (!passwordMatched) {
            throw new BadRequestException(`Password is wrong!!!`)
        }
        const expiredIn = 1;
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
        const payload = { userId: user.id };
        const accessToken = this.jwtService.sign(payload, { expiresIn: `${expiredIn}d` });

        return { accessToken: `Bearer ${accessToken}`, expiresAt };
    }

    async register(registerDto: RegisterDto): Promise<{}> {
        const user = await this.userRepository.findOne({ where: { username: registerDto.username } });
        if (user) {
            throw new BadRequestException(`User already exists!`)
        }
        const newUser = await this.userRepository.create(registerDto)
        await this.userRepository.save(newUser);
        return newUser;
    }
}
