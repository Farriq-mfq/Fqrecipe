import { Paginate } from '@V1/types/paginate.type';
import { toPaginate } from '@V1/utils/paginate';
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { recipes, users } from '@prisma/client';
import { PrismaService } from './../../../prisma/prisma.service';
import { RecipeDto } from './dto/recipe.dto';

@Injectable()
export class RecipesService {

  constructor(private PrismaService: PrismaService) { }
  private async checkExist<V>(model: any, key: string, value: V): Promise<boolean> {
    const check = await model.findUnique({ where: { [key]: value } })
    if (check != null) return true
    return false
  }
  async create(recipeDto: RecipeDto, user: users): Promise<Partial<recipes>> {
    try {
      // check dish exist
      if (!(await this.checkExist<number>(this.PrismaService.dishs, 'id', recipeDto.dish))) throw new NotFoundException('dish not found')
      // check category exist
      if (!(await this.checkExist<number>(this.PrismaService.categories, 'id', recipeDto.category))) throw new NotFoundException('categroy not found')

      return await this.PrismaService.recipes.create({
        data: {
          name: recipeDto.name,
          usersId: user.id,
          dishsId: recipeDto.dish,
          categoriesId: recipeDto.category,
          cook_time: recipeDto.cook_time,
          prep_time: recipeDto.cook_time,
          description: recipeDto.description,
          image_url: recipeDto.image_url,
        },
        select: {
          name: true,
          dish: true,
          category: true,
          cook_time: true,
          prep_time: true,
          image_url: true,
          description: true
        }
      })
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw new NotFoundException(e.message)
      } else {
        throw new InternalServerErrorException()
      }
    }
  }

  async findAll(page: number, perPage: number, user: users): Promise<Paginate<recipes>> {
    try {
      const paginate = toPaginate({ perPage, page })
      return paginate(this.PrismaService.recipes, { where: { usersId: user.id } });
    } catch (e) {
      throw new InternalServerErrorException()
    }
  }

  async findOne(id: number, user: users): Promise<recipes> {
    try {
      // check recipies exist
      if (!(await this.checkExist<number>(this.PrismaService.recipes, 'id', id))) throw new NotFoundException('recipe not found')

      return await this.PrismaService.recipes.findUnique({
        where: {
          id,
          usersId: user.id
        }
      })
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw new NotFoundException(e.message)
      } else {
        throw new InternalServerErrorException()
      }
    }
  }

  async update(id: number, recipeDto: RecipeDto, user: users): Promise<Partial<recipes>> {
    try {
      // check recipies exist
      if (!(await this.checkExist<number>(this.PrismaService.recipes, 'id', id))) throw new NotFoundException('recipe not found')
      // check dish exist
      if (!(await this.checkExist<number>(this.PrismaService.dishs, 'id', recipeDto.dish))) throw new NotFoundException('dish not found')
      // check category exist
      if (!(await this.checkExist<number>(this.PrismaService.categories, 'id', recipeDto.category))) throw new NotFoundException('categroy not found')

      return await this.PrismaService.recipes.update({
        where: {
          id,
          usersId: user.id
        },
        data: {
          name: recipeDto.name,
          dishsId: recipeDto.dish,
          categoriesId: recipeDto.category,
          cook_time: recipeDto.cook_time,
          prep_time: recipeDto.cook_time,
          description: recipeDto.description,
          image_url: recipeDto.image_url,
        },
        select: {
          name: true,
          dish: true,
          category: true,
          cook_time: true,
          prep_time: true,
          image_url: true,
          description: true
        }
      })
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw new NotFoundException(e.message)
      } else {
        throw new InternalServerErrorException()
      }
    }
  }

  async remove(id: number, user: users): Promise<recipes> {
    try {
      // check recipies exist
      if (!(await this.checkExist<number>(this.PrismaService.recipes, 'id', id))) throw new NotFoundException('recipe not found')

      return await this.PrismaService.recipes.delete({ where: { id, usersId: user.id } })
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw new NotFoundException(e.message)
      } else {
        throw new InternalServerErrorException()
      }
    }
  }
}
