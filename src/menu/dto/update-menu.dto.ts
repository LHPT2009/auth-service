import { IsString, IsOptional } from 'class-validator';

export class UpdateMenuDto {
    @IsString()
    @IsOptional()
    readonly name?: string;
}