import { IsString, IsOptional } from 'class-validator';

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    readonly name?: string;

    @IsString()
    @IsOptional()
    readonly username?: string;

    @IsString()
    @IsOptional()
    readonly password?: string;
}