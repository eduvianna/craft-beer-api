import { UseGuards } from '@nestjs/common';
import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/graphql-auth.guard';
import { CreateSensorInput } from './dto/create-sensor.input';
import { UpdateSensorInput } from './dto/update-sensor.input';
import { Sensor } from './sensor.entity';
import { SensorService } from './sensor.service';

@Resolver(() => Sensor)
export class SensorResolver {
  constructor(private sensorService: SensorService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [Sensor])
  async sensors(): Promise<Sensor[]> {
    return this.sensorService.findAllSensors();
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Sensor)
  async createSensor(@Args('data') data: CreateSensorInput): Promise<Sensor> {
    return this.sensorService.createSensor(data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Sensor)
  async updateSensor(
    @Args('id') id: string,
    @Args('data') data: UpdateSensorInput,
  ): Promise<Sensor> {
    return this.sensorService.updateSensor(id, data);
  }
}
