import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { File } from 'src/file/file.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(File) private fileRepository: Repository<File>,
  ) {}

  async findAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async createUser(data: CreateUserInput): Promise<User> {
    let user = await this.userRepository.findOne({
      where: { email: data.email },
    });

    if (user) {
      throw new BadRequestException('User already registered.');
    }

    user = await this.userRepository.create(data);

    try {
      await this.userRepository.save(user);
    } catch (err) {
      throw new InternalServerErrorException('Cannot create an user');
    }

    return user;
  }

  async updateUser(data: UpdateUserInput, user: User) {
    if (data.email && data.email !== user.email) {
      const userExists = await this.userRepository.findOne({
        where: { email: data.email },
      });

      if (userExists) {
        throw new BadRequestException('Email already in use.');
      }
    }

    if (data.username && data.username !== user.username) {
      const userExists = await this.userRepository.findOne({
        where: { username: data.username },
      });

      if (userExists) {
        throw new BadRequestException('Username already in use.');
      }
    }

    if (data.oldPassword && !(await user.checkPassword(data.oldPassword))) {
      throw new BadRequestException('Invalid old password.');
    }

    await this.userRepository.update(user, { ...data });

    return this.userRepository.create({ ...user, ...data });
  }

  async getAvatarField(data: User): Promise<File> {
    return this.fileRepository.findOne({ where: { id: data.avatarId } });
  }
}
