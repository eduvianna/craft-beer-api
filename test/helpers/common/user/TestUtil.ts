import * as faker from 'faker';
import { CreateUserInput } from 'src/user/dto/create-user.input';
import { UpdateUserInput } from 'src/user/dto/update-user.input';
import { User } from 'src/user/user.entity';

export const mockAddAccountParams: CreateUserInput = {
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  avatarId: faker.random.uuid(),
};

export const mockUpdateUserParams: UpdateUserInput = {
  email: faker.internet.email(),
};

export const mockUserModel: User = {
  id: faker.random.uuid(),
  ...mockAddAccountParams,
};

export const mockUpdatedUserModel: User = {
  ...mockUserModel,
  email: faker.internet.email()
}

export const mockUserArrayModel: User[] = [
  mockUserModel, 
  {
    id: faker.random.uuid()
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    avatarId: faker.random.uuid(),
  },
  {
    id: faker.random.uuid()
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    avatarId: faker.random.uuid(),
  }
]
