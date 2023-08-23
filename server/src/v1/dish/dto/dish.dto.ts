import { IsString, IsNotEmpty, Max, MaxLength } from 'class-validator'
export class dishDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(55)
    dish: string
}
