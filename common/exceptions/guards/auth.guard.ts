import {
    Injectable,
    CanActivate,
    ExecutionContext,
    BadRequestException,
    InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { UserService } from 'src/user/user.service';

dotenv.config();

interface formatInfo {
    roles?: string[];
    permissions?: string[];
}

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const getaccesstoken = request.headers['authorization'];

        if (!getaccesstoken || getaccesstoken === 'null') {
            throw new BadRequestException(`AccessToken is null!!!`)
        }

        try {
            const splitAccessToken = getaccesstoken.split(' ')[1];

            const decode = this.jwtService.verify(splitAccessToken, {
                secret: process.env.JWT_SECRET || 'secret',
            });

            const info: formatInfo = await this.userService.findRoleAndPermissionByUserId(`${decode.userId}`);

            request.userRole = {
                roles: info.roles || [],
                permissions: info.permissions || [],
            };

            return true;
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                throw new BadRequestException(`TokenExpiredError!!!`)
            }
            if (err.name === 'JsonWebTokenError') {
                throw new BadRequestException(`JsonWebTokenError!!!`)
            }
            throw new InternalServerErrorException(`InternalServerErrorException!!!`)
        }
    }
}