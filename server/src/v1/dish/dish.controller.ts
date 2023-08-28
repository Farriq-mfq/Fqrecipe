import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { DishService } from './dish.service';
import { dishDto } from './dto/dish.dto';

@Controller('dish')
export class DishController {
  constructor(private readonly dishService: DishService) { }

  @Post()
  async create(@Body() createDishDto: dishDto) {
    return await this.dishService.create(createDishDto);
  }

  @Get()
  async findAll() {
    return await this.dishService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.dishService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDtoDto: dishDto) {
    return await this.dishService.update(+id, updateDtoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.dishService.remove(+id);
  }
}
