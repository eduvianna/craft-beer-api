import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Measurement } from './measurement.entity';
import { MeasurementResolver } from './measurement.resolver';
import { MeasurementService } from './measurement.service';
import { MeasurementGateway } from './measurement.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Measurement])],
  providers: [MeasurementResolver, MeasurementService, MeasurementGateway],
})
export class MeasurementModule {}
