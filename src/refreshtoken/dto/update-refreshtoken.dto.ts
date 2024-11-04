import { IsString, IsOptional } from 'class-validator';

export class UpdateRefreshtokenDto {
    @IsString()
    @IsOptional()
    readonly name?: string;
}