import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/graphql-auth.guard';

import { User } from './user.entity';
import { File } from 'src/file/file.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UserService } from './user.service';
import { UpdateUserInput } from './dto/update-user.input';
import { CurrentUser } from 'src/decorators/current-user.decorator';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.userService.findAllUsers();
  }

  @Mutation(() => User)
  async createUser(@Args('data') data: CreateUserInput): Promise<User> {
    return this.userService.createUser(data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async updateUser(
    @Args('data') data: UpdateUserInput,
    @CurrentUser() user: User,
  ): Promise<User> {
    return this.userService.updateUser(data, user);
  }

  @ResolveField(() => File, { name: 'avatar' })
  async getAvatar(@Parent() parent: User): Promise<File> {
    return this.userService.getAvatarField(parent);
  }
}
