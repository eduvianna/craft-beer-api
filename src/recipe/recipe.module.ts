import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Recipe } from './recipe.entity';
import { RecipeResolver } from './recipe.resolver';
import { RecipeService } from './recipe.service';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe]), AuthModule],
  providers: [RecipeResolver, RecipeService],
})
export class RecipeModule {}
