import {
    Injectable,
    CanActivate,
    ExecutionContext,
    BadRequestException,
    InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const getaccesstoken = request.headers['authorization'];

        if (!getaccesstoken || getaccesstoken === 'null') {
            throw new BadRequestException(`AccessToken is null!!!`)
        }

        try {
            const splitAccessToken = getaccesstoken.split(' ')[1];

            const decoded = this.jwtService.verify(splitAccessToken, {
                secret: process.env.JWT_SECRET || 'secret',
            });
            request.accessToken = splitAccessToken;
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