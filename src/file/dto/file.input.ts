import { InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export default class FileInput {
  @IsString({ message: 'Name should be string' })
  readonly name: string;

  @IsString({ message: 'Path should be string' })
  readonly path: string;
}
