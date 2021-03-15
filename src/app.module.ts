import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { FileModule } from './file/file.module';
import { SensorModule } from './sensor/sensor.module';
import { MeasurementModule } from './measurement/measurement.module';
import { RecipeModule } from './recipe/recipe.module';
import * as databaseOptions from './config/database';
@Module({
  imports: [
    TypeOrmModule.forRoot(databaseOptions),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      introspection: true,
      playground: true,
      context: ({ req }) => ({ req }),
    }),
    UserModule,
    FileModule,
    AuthModule,
    SensorModule,
    MeasurementModule,
    RecipeModule,
  ],
})
export class AppModule {}
