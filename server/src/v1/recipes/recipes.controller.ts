import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { RecipeDto } from './dto/recipe.dto';
import { RecipesService } from './recipes.service';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) { }

  @Post()
  create(@Body() recipeDto: RecipeDto) {
    return this.recipesService.create(recipeDto);
  }

  @Get()
  findAll(@Query('page', ParseIntPipe) page: number, @Query('perpage', ParseIntPipe) perPage: number, @Query('search') search?: string) {
    return this.recipesService.findAll(page, perPage, search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() recipeDto: RecipeDto) {
    return this.recipesService.update(+id, recipeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recipesService.remove(+id);
  }
}
