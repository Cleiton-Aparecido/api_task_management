import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Unique,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Permission } from './permissions.entity';
import { Task } from './task.entity';

@Entity('users_permissions')
@Unique('IDX_USER_PERMISSION_UNIQUE', ['userId', 'permissionId'])
export class UserPermission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  permissionId: string;

  @ManyToOne(() => User, (user) => user.usersPermissions, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Permission, (permission) => permission.usersPermissions)
  permission: Permission;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
