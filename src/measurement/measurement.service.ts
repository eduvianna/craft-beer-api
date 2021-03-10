import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Measurement } from './measurement.entity';
import { CreateMeasurementInput } from './dto/create-measurement.input';

@Injectable()
export class MeasurementService {
  constructor(
    @InjectRepository(Measurement)
    private measurementRepostiory: Repository<Measurement>,
  ) {}

  async getMeasurements(): Promise<Measurement[]> {
    return this.measurementRepostiory.find({
      take: 20,
      order: { createdAt: 'DESC' },
      relations: ['sensor'],
    });
  }

  async createMeasurement(data: CreateMeasurementInput): Promise<Measurement> {
    const measurement = await this.measurementRepostiory.create(data);

    try {
      await this.measurementRepostiory.save(measurement);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }

    return measurement;
  }
}
