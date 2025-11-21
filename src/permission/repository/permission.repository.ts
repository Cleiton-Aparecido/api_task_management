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
    private readonly PermissionRepository: Repository<Permission>,
    @InjectRepository(UserPermission)
    private readonly UserPermissionRepository: Repository<UserPermission>,
  ) {}

  async find(where: Partial<any>): Promise<any | null> {
    return this.PermissionRepository.findOne({ where });
  }
}
