import { InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateSensorInput {
  @IsString({ message: 'Sensor name must be a string' })
  @IsOptional()
  readonly name?: string;

  @IsString({ message: 'Sensor descritpion must be a string' })
  @IsOptional()
  readonly description?: string;

  @IsString({ message: 'Sensor type must be a string' })
  @IsOptional()
  readonly type?: string;
}
