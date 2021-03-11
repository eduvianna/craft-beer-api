import {
  ExecutionContext,
  Injectable,
  BadRequestException,
  CanActivate,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Injectable()
export class GqlAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = this.getRequest(context);
    const authHeader = req.header('Authorization');

    if (!authHeader) {
      throw new BadRequestException('Authorization not found');
    }

    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer') {
      throw new BadRequestException(
        `Authentication type \'Bearer\' required, Found \'${type}\'`,
      );
    }

    const { isValid, user } = await this.authService.validateToken(token);

    if (isValid) {
      req.user = user;
      return true;
    }

    throw new UnauthorizedException('Token not valid.');
  }
}
