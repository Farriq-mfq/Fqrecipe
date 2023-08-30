import { User } from '@V1/decorators/user.decorator';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { RecipeDto } from './dto/recipe.dto';
import { RecipesService } from './recipes.service';
import { AuthGuard } from '@V1/auth/guard/auth.guard';

@UseGuards(AuthGuard)
@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) { }

  @Post()
  async create(@Body() recipeDto: RecipeDto, @User() user: any) {
    return await this.recipesService.create(recipeDto, user);
  }

  @Get()
  findAll(@Query('page', ParseIntPipe) page: number, @Query('perpage', ParseIntPipe) perPage: number, @User() user: any) {
    return this.recipesService.findAll(page, perPage, user);
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: string, @User() user: any) {
    return await this.recipesService.findOne(+id, user);
  }

  @Patch(':id')
  async update(@Param('id', new ParseIntPipe()) id: string, @Body() recipeDto: RecipeDto, @User() user: any) {
    return await this.recipesService.update(+id, recipeDto, user);
  }

  @Delete(':id')
  async remove(@Param('id', new ParseIntPipe()) id: string, @User() user: any) {
    return await this.recipesService.remove(+id, user);
  }
}
