import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePermissionDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;
}