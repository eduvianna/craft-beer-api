import { InputType } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@InputType()
export class AuthInput {
  @IsEmail()
  readonly email: string;

  @IsString({ message: 'Password must be a string' })
  readonly password: string;
}
