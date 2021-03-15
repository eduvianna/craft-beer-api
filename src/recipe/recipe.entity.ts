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
import { User } from 'src/user/user.entity';

@ObjectType()
@Entity({ name: 'recipes' })
export class Recipe {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Associations
  @ManyToOne(
    () => User,
    user => user.recipes,
    { primary: true },
  )
  @JoinColumn({ name: 'user_id' })
  user: Promise<User>;
}
