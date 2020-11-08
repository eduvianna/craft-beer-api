import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/user/user.entity';
import { LoginResponse } from 'src/auth/dto/auth.input';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<LoginResponse> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw 'User not found';
    }

    if (user && (await user.checkPassword(password))) {
      const token = this.jwtService.sign({
        userId: user.id,
        email: user.email,
      });
      return { user, token };
    }
  }

  async validateToken(
    token: string,
  ): Promise<{ isValid: boolean; user?: User }> {
    try {
      const { userId } = this.jwtService.verify(token);
      const user = await this.userRepository.findOne({
        where: { id: userId },
      });

      return { isValid: true, user };
    } catch (error) {
      return { isValid: false };
    }
  }
}
