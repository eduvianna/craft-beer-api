import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Recipe } from './recipe.entity';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe) private recipeRepository: Repository<Recipe>,
  ) {}

  async findAllRecipes() {
    return this.recipeRepository.find();
  }

  async findAllRecipesFromUser(user: User) {
    return this.recipeRepository.find({ where: { userId: user.id } });
  }

  async findRecipeFromUser(id: string, user: User) {
    return this.recipeRepository.findOneOrFail({
      where: { id, userId: user.id },
    });
  }

  async createRecipe(user: User) {
    return this.recipeRepository.find({ where: { userId: user.id } });
  }
}
