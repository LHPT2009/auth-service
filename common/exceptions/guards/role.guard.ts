import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { MESSAGE } from 'common/constants/message';

interface UserRole {
    roles: string[];
}

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());

        const userRole: UserRole = request.userRole;

        if (!requiredRoles) {
            return true;
        }

        if (requiredRoles.length > 0) {

            const hasRole = userRole.roles.some(role =>
                requiredRoles.includes(role)
            );

            if (!hasRole) {
                throw new UnauthorizedException(MESSAGE.ERR_ROLE_NOT_MATCH);
            }
        }

        return true;
    }
}