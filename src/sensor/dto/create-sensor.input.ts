import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateSensorInput {
  @IsString()
  @IsNotEmpty({ message: 'You must inform an id to sensor' })
  sensor_id: string;

  @IsString()
  @IsNotEmpty({ message: 'You must inform a name to sensor' })
  username: string;

  @IsString()
  description?: string;

  @IsString()
  @IsNotEmpty({ message: 'You must inform a type to sensor' })
  type: string;
}
