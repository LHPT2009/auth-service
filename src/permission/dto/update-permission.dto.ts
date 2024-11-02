import { IsString, IsOptional } from 'class-validator';

export class UpdatePermissionDto {
    @IsString()
    @IsOptional()
    readonly name?: string;
}