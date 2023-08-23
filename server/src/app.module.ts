import { CategoriesModule } from '@V1/categories/categories.module';
import { DishModule } from '@V1/dish/dish.module';
import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [CategoriesModule, DishModule, PrismaModule],
})
export class AppModule { }
