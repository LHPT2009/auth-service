import {
    Injectable,
    CanActivate,
    ExecutionContext,
    BadRequestException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

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
            if (!userRole.roles) {
                throw new BadRequestException(`Roles are missing in AccessToken!`);
            }

            const hasRole = userRole.roles.some(role =>
                requiredRoles.includes(role)
            );

            if (!hasRole) {
                throw new BadRequestException(`User lacks the required roles!`);
            }
        }

        return true;
    }
}