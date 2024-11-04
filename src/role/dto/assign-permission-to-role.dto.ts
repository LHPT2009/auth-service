import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class AssignPermissionsToRoleDto {
    @IsString()
    @IsNotEmpty()
    readonly roleId: string;

    @IsArray()
    readonly permissionIds: string[];
}