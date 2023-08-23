import { IsString, IsNotEmpty, Max, MaxLength } from 'class-validator'
export class CategoryDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(55)
    category: string
}
