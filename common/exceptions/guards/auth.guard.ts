import {
    Injectable,
    CanActivate,
    ExecutionContext,
    InternalServerErrorException,
    UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MESSAGE } from 'common/constants/message';
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
            throw new UnauthorizedException(MESSAGE.ERR_TOKEN_REQUIRED)
        }

        try {
            const splitAccessToken = getaccesstoken.split(' ')[1];

            if (!splitAccessToken) {
                throw new UnauthorizedException(MESSAGE.ERR_TOKEN_INVAILD);
            }

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
                throw new UnauthorizedException(MESSAGE.ERR_TOKEN_EXPIRED)
            }
            if (err.name === 'JsonWebTokenError') {
                throw new UnauthorizedException(MESSAGE.ERR_TOKEN_INVAILD)
            }
            throw new InternalServerErrorException(MESSAGE.INTERNAL_SERVER_ERROR)
        }
    }
}