import { Paginate } from '@V1/types/paginate.type';
import { toPaginate } from '@V1/utils/paginate';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { recipes } from '@prisma/client';
import { PrismaService } from './../../../prisma/prisma.service';
import { RecipeDto } from './dto/recipe.dto';

@Injectable()
export class RecipesService {

  constructor(private PrismaService: PrismaService) { }
  create(recipeDto: RecipeDto) {
    return 'This action adds a new recipe';
  }

  async findAll(page: number, perPage: number, search?: string): Promise<Paginate<recipes>> {
    try {
      const paginate = toPaginate({ perPage, page })
      return paginate(this.PrismaService.recipes, {
        where: {
          name: {
            search: search ?? ""
          }
        }
      });

      this.PrismaService.recipes.findMany({
        where: {
          name: {
            search: 'cat | dog',
          }
        }
      })
    } catch (e) {
      throw new InternalServerErrorException()
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} recipe`;
  }

  update(id: number, recipeDto: RecipeDto) {
    return `This action updates a #${id} recipe`;
  }

  remove(id: number) {
    return `This action removes a #${id} recipe`;
  }
}
