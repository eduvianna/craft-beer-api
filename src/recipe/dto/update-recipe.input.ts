import { InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateRecipeInput {
  @IsString({ message: 'Recipe name must be a string' })
  @IsOptional()
  readonly name?: string;

  @IsString({ message: 'Recipe descritpion must be a string' })
  @IsOptional()
  readonly description?: string;
}
