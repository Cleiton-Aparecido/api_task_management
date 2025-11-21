import { Injectable } from '@nestjs/common';
import { IPermissionRepository } from '../interface/permission.repository.interface';
import { PermissionUseCase } from './permission.usecase';

@Injectable()
export class PermissionService implements PermissionUseCase {
  constructor(private readonly permissionRepository: IPermissionRepository) {}

  async createAdmin(userId: string): Promise<any> {}
}
