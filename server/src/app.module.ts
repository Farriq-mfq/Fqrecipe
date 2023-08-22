import { CategoriesModule } from '@V1/categories/categories.module';
import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [CategoriesModule, PrismaModule],
})
export class AppModule { }
