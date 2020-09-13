import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import bcrypt from 'bcryptjs';

import File from './file.entity';

@ObjectType()
@Entity({ name: 'users' })
export default class User {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  username: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @Column({ name: 'avatar_id' })
  avatarId: string;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Field(() => File)
  file: File;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 8);
  }

  // Associations
  @OneToOne(
    () => File,
    file => file.userConnection,
    { primary: true },
  )
  @JoinColumn({ name: 'avatar_id' })
  fileConnection: Promise<File>;

  checkPassword(password) {
    return bcrypt.compare(password, this.password);
  }
}
