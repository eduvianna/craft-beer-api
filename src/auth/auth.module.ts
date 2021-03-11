import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { GqlAuthGuard } from './graphql-auth.guard';
import { AuthResolver } from 'src/auth/auth.resolver';
import { User } from 'src/user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3d' },
    }),
  ],
  providers: [AuthResolver, AuthService, GqlAuthGuard],
  exports: [GqlAuthGuard, AuthService],
})
export class AuthModule {}
