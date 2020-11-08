import { InputType } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @IsEmail()
  @IsOptional()
  readonly email?: string;

  @IsString({ message: 'Username must be a string' })
  @IsOptional()
  readonly username?: string;

  @IsString({ message: 'password must be a string' })
  @IsOptional()
  readonly password?: string;

  @IsString({ message: 'old password must be a string' })
  @IsOptional()
  readonly oldPassword?: string;

  @IsUUID(4)
  @IsOptional()
  readonly avatarId?: string;
}
