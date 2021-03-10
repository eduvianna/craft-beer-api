import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Sensor } from 'src/sensor/sensor.entity';

@ObjectType()
@Entity({ name: 'measurements' })
export class Measurement {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'sensor_id' })
  sensorId: string;

  @Column()
  value: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Associatios
  @ManyToOne(
    () => Sensor,
    sensor => sensor.measurements,
  )
  @JoinColumn({ name: 'sensor_id' })
  sensor: Promise<Sensor> | Sensor;
}
