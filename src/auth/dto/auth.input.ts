import { Field, InputType, ObjectType } from '@nestjs/graphql';
import User from 'src/db/models/user.entity';

@InputType()
export default class AuthInput {
  @Field()
  readonly email: string;

  @Field()
  readonly password: string;
}

@ObjectType()
export class LoginResponse {
  @Field()
  readonly user: User;

  @Field()
  readonly token: string;
}
