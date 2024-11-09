import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { MESSAGE } from 'common/constants/message';

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

            const hasPermission = userRole.permissions.some(permission =>
                requiredPermissions.includes(permission)
            );

            if (!hasPermission) {
                throw new UnauthorizedException(MESSAGE.ERR_PERMISSION_NOT_MATCH);
            }
        }

        return true;
    }
}