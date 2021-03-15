import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateRecipeInput {
  @IsString()
  @IsNotEmpty({ message: 'You must inform a name to recipe' })
  name: string;

  @IsString()
  description?: string;

  @IsString()
  @IsNotEmpty({ message: 'You must inform a user_id to recipe' })
  userId: string;
}
