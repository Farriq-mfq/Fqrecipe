import { PrismaService } from './../../../prisma/prisma.service';
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CategoryDto } from './dto/category.dto';
import { categories } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor(private readonly PrismaService: PrismaService) { }

  async create(createCategoryDto: CategoryDto): Promise<categories> {
    try {
      return await this.PrismaService.categories.create({ data: { name: createCategoryDto.category } })
    } catch (e) {
      throw new InternalServerErrorException()
    }
  }

  async findAll() {
    try {
      return await this.PrismaService.categories.findMany()
    } catch (e) {
      throw new InternalServerErrorException()
    }
  }

  async findOne(id: number): Promise<categories> {
    try {
      return await this.PrismaService.categories.findUnique({ where: { id } })
    } catch (e) {
      throw new InternalServerErrorException()
    }
  }

  async update(id: number, updateCategoryDto: CategoryDto): Promise<categories> {
    try {
      const checkCategory = await this.PrismaService.categories.findUnique({
        where: {
          id
        }
      })

      if (checkCategory == null) {
        throw new NotFoundException('category not found')
      }
      const updateCategory = await this.PrismaService.categories.update({ where: { id }, data: { name: updateCategoryDto.category } })
      return updateCategory
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw new NotFoundException(e.message)
      } else {
        throw new InternalServerErrorException()
      }
    }
  }

  async remove(id: number) {
    try {
      const checkCategory = await this.PrismaService.categories.findUnique({
        where: {
          id
        }
      })
      if (checkCategory === null) {
        throw new NotFoundException('category not found')
      }

      const deleteCategory = await this.PrismaService.categories.delete({ where: { id } })
      return deleteCategory
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw new NotFoundException(e.message)
      } else {
        throw new InternalServerErrorException()
      }
    }
  }
}
