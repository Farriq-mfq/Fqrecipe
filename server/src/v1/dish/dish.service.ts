import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { dishs } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { dishDto } from './dto/dish.dto';

@Injectable()
export class DishService {
  constructor(private readonly PrismaService: PrismaService) { }

  async create(createDishDto: dishDto): Promise<dishs> {
    try {
      return await this.PrismaService.dishs.create({ data: { name: createDishDto.dish } })
    } catch (e) {
      throw new InternalServerErrorException()
    }
  }

  async findAll() {
    try {
      return await this.PrismaService.dishs.findMany()
    } catch (e) {
      throw new InternalServerErrorException()
    }
  }

  async findOne(id: number): Promise<dishs> {
    try {
      return await this.PrismaService.dishs.findUnique({ where: { id } })
    } catch (e) {
      throw new InternalServerErrorException()
    }
  }

  async update(id: number, updateDishDto: dishDto): Promise<dishs> {
    try {
      const checkDish = await this.PrismaService.dishs.findUnique({
        where: {
          id
        }
      })

      if (checkDish == null) {
        throw new NotFoundException('dish not found')
      }
      const updateDish = await this.PrismaService.dishs.update({ where: { id }, data: { name: updateDishDto.dish } })
      return updateDish
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
      const checkDish = await this.PrismaService.dishs.findUnique({
        where: {
          id
        }
      })
      if (checkDish == null) {
        throw new NotFoundException('dish not found')
      }
      const deleteDish = await this.PrismaService.dishs.delete({ where: { id } })
      return deleteDish
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw new NotFoundException(e.message)
      } else {
        throw new InternalServerErrorException()
      }
    }
  }
}
