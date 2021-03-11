import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Sensor } from './sensor.entity';
import { SensorResolver } from './sensor.resolver';
import { SensorService } from './sensor.service';

@Module({
  imports: [TypeOrmModule.forFeature([Sensor]), AuthModule],
  providers: [SensorResolver, SensorService],
})
export class SensorModule {}
