import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { FileModule } from './file/file.module';
import * as databaseOptions from './config/database';
@Module({
  imports: [
    TypeOrmModule.forRoot(databaseOptions),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      playground: true,
      context: ({ req }) => ({ req }),
    }),
    UserModule,
    FileModule,
    AuthModule,
  ],
})
export class AppModule {}
