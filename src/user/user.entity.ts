import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  OneToOne,
  JoinColumn,
  BeforeUpdate,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, ID, HideField } from '@nestjs/graphql';
import * as bcrypt from 'bcryptjs';

import { File } from '../file/file.entity';
import { Recipe } from 'src/recipe/recipe.entity';

@ObjectType()
@Entity({ name: 'users' })
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  @HideField()
  password: string;

  @Column({ name: 'avatar_id' })
  avatarId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Field(() => File)
  file: File;

  @BeforeInsert()
  @BeforeUpdate()
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

  @OneToMany(
    () => Recipe,
    recipe => recipe.user,
  )
  recipes: Promise<Recipe[]>;

  checkPassword(password) {
    return bcrypt.compare(password, this.password);
  }
}
