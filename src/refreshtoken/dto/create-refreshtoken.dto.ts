import { IsString, IsNotEmpty } from 'class-validator';

export class CreateRefreshtokenDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;
}