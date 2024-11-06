import { IsString, IsNotEmpty } from 'class-validator';

export class CreateMenuDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    readonly url: string;
}