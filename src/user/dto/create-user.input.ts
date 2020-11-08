import { InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsEmail()
  @IsNotEmpty({ message: 'You must inform an email' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'You must inform an username' })
  username: string;

  @IsString()
  @IsNotEmpty({ message: 'You must inform the password' })
  password: string;

  @IsUUID(4)
  @IsNotEmpty({ message: 'You must inform the avatar' })
  avatarId: string;
}
