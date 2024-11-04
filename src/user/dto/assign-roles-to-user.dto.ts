import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class AssignRolesToUserDto {
    @IsString()
    @IsNotEmpty()
    readonly userId: string;

    @IsArray()
    readonly roleIds: string[];
}