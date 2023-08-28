import { JwtModule } from '@nestjs/jwt';
import { CategoriesModule } from '@V1/categories/categories.module';
import { DishModule } from '@V1/dish/dish.module';
import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { RecipesModule } from '@V1/recipes/recipes.module';
import { AuthModule } from '@V1/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import configuration from '@V1/config/configuration';
import { APP_GUARD } from '@nestjs/core';
import { OnlyGuard } from '@V1/guards/only.guard';
import { AuthGuard } from '@V1/auth/guard/auth.guard';

@Module({
  imports: [CategoriesModule, DishModule, PrismaModule, RecipesModule, AuthModule,
    JwtModule.register({
      global: true
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: OnlyGuard
    }
  ]
},
)
export class AppModule { }
