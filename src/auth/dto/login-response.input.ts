import { ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { User } from 'src/user/user.entity';

@ObjectType()
export class LoginResponse {
  readonly user: User;

  @IsString({ message: 'Token should be string' })
  readonly token: string;
}
