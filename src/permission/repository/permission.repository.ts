import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindOptionsWhere, IsNull, Repository } from 'typeorm';
import { User } from '../../config/entities/user.entity';
import { IPermissionRepository } from '../interface/permission.repository.interface';
import { Permission } from 'src/config/entities/permissions.entity';
import { UserPermission } from 'src/config/entities/user-permission.entity';

@Injectable()
export class PermissionRepository implements IPermissionRepository {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
    @InjectRepository(UserPermission)
    private readonly userPermissionRepository: Repository<UserPermission>,
  ) {}

  private buildWhere(
    partial: Partial<Permission>,
  ): FindOptionsWhere<Permission> {
    const { feeds, deletedAt, ...rest } = partial as any;
    const where: any = {};
    Object.entries(rest).forEach(([key, value]) => {
      if (value === undefined || value === null || typeof value === 'object')
        return;
      where[key] = value;
    });

    if (deletedAt === null) {
      where.deletedAt = IsNull();
    } else if (deletedAt instanceof Date) {
      where.deletedAt = deletedAt;
    }

    return where as FindOptionsWhere<Permission>;
  }

  async find(where: Partial<any>): Promise<any | null> {
    return this.permissionRepository.findOne({ where });
  }

  async save(user: DeepPartial<UserPermission>): Promise<UserPermission> {
    return this.userPermissionRepository.save(user);
  }

  async create(data: DeepPartial<UserPermission>): Promise<UserPermission> {
    return this.userPermissionRepository.create(data);
  }
}
