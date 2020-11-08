import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';
import LoginInput, { LoginResponse } from './dto/auth.input';
import { AuthService } from 'src/auth/auth.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/graphql-auth.guard';
import { CurrentUser } from 'src/decorators/current-user.decorator';

@Resolver(() => User)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponse)
  async login(
    @Args('data') { email, password }: LoginInput,
  ): Promise<LoginResponse> {
    return this.authService.validateUser(email, password);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  async whoAmI(@CurrentUser() user: User): Promise<User> {
    return user;
  }
}
