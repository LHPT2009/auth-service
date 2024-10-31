import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UserService
    ) { }

    async login(): Promise<{}> {

        return {};
    }

    async register(createUserDto: CreateUserDto): Promise<{}> {
        // const checkUser = await this.userService.findUserByUsername(createUserDto.username);
        // if (checkUser) {
        //     throw new BadRequestException(`có username rồi`);
        // }

        await this.userService.create(createUserDto)
        return createUserDto;
    }

    async refreshAccesstoken(): Promise<{}> {
        return {};
    }
}
