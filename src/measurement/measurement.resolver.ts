import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateMeasurementInput } from './dto/create-measurement.input';
import { Measurement } from './measurement.entity';
import { MeasurementService } from './measurement.service';

@Resolver()
export class MeasurementResolver {
  constructor(private measurementService: MeasurementService) {}

  @Mutation(() => Measurement)
  async createMeasurement(
    @Args('data') data: CreateMeasurementInput,
  ): Promise<Measurement> {
    return this.measurementService.createMeasurement(data);
  }
}
