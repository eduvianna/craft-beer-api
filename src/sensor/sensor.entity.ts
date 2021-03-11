import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Measurement } from 'src/measurement/measurement.entity';

@ObjectType()
@Entity({ name: 'sensors' })
export class Sensor {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  type: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Associations
  @OneToMany(
    () => Measurement,
    measurement => measurement.sensor,
  )
  measurements: Promise<Measurement[]>;
}
