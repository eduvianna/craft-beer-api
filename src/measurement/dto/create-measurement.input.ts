import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateMeasurementInput {
  @IsString()
  @IsNotEmpty({ message: 'You must inform a sensor_id to measurement' })
  sensorId: string;

  @IsNumber()
  @IsNotEmpty({ message: 'You must inform a value to measurement' })
  value: number;
}
