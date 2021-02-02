import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSensorInput } from './dto/create-sensor.input';
import { UpdateSensorInput } from './dto/update-sensor.input';
import { Sensor } from './sensor.entity';

@Injectable()
export class SensorService {
  constructor(
    @InjectRepository(Sensor) private sensorRepository: Repository<Sensor>,
  ) {}

  async findAllSensors(): Promise<Sensor[]> {
    return this.sensorRepository.find();
  }

  async createSensor(data: CreateSensorInput): Promise<Sensor> {
    const sensor = await this.sensorRepository.create(data);

    try {
      await this.sensorRepository.save(sensor);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }

    return sensor;
  }

  async updateSensor(data: UpdateSensorInput): Promise<Sensor> {
    const sensor = await this.sensorRepository.findOne({
      where: { sensor_id: data.sensor_id },
    });

    await this.sensorRepository.update(sensor, data);

    return this.sensorRepository.create({ ...sensor, ...data });
  }

  async showSensor(data: Sensor): Promise<Sensor> {
    return this.sensorRepository.findOne({ where: { id: data.id } });
  }
}
