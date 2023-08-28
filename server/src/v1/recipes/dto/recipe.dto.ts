import { IsInt, IsNotEmpty, IsString } from "class-validator"

export class RecipeDto {
    @IsString()
    @IsNotEmpty()
    name: string
    @IsInt()
    @IsNotEmpty()
    dish: number
    @IsInt()
    @IsNotEmpty()
    category: number
    @IsString()
    @IsNotEmpty()
    description: string
    @IsInt()
    @IsNotEmpty()
    prep_time: number
    @IsInt()
    @IsNotEmpty()
    cook_time: number
    @IsString()
    @IsNotEmpty()
    image_url: string
}
