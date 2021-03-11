import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateSensorInput {
  @IsString()
  @IsNotEmpty({ message: 'You must inform a name to sensor' })
  name: string;

  @IsString()
  description?: string;

  @IsString()
  @IsNotEmpty({ message: 'You must inform a type to sensor' })
  type: string;
}
