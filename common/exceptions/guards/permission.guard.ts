import {
    Injectable,
    CanActivate,
    ExecutionContext,
    BadRequestException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

interface UserRole {
    permissions: string[];
}

@Injectable()
export class PermissionGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const requiredPermissions = this.reflector.get<string[]>('permissions', context.getHandler());

        const userRole: UserRole = request.userRole;

        if (!requiredPermissions) {
            return true;
        }

        if (requiredPermissions.length > 0) {
            if (!userRole.permissions) {
                throw new BadRequestException(`Permissions are missing in AccessToken!`);
            }

            const hasPermission = userRole.permissions.some(permission =>
                requiredPermissions.includes(permission)
            );

            if (!hasPermission) {
                throw new BadRequestException(`User lacks the required permissions!`);
            }
        }

        return true;
    }
}