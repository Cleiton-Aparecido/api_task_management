import { Injectable } from '@nestjs/common';
import { IPermissionRepository } from '../interface/permission.repository.interface';
import { PermissionUseCase } from './permission.usecase';
import { permissionDto } from '../enum/permission.enum';

@Injectable()
export class PermissionService implements PermissionUseCase {
  constructor(private readonly permissionRepository: IPermissionRepository) {}

  async createAdmin(userId: string, admin: boolean): Promise<any> {
    console.log(userId);
    const permission = await this.permissionRepository.find({
      name: admin ? permissionDto.ADMIN : permissionDto.USER,
    });

    const userPermissionCreated = await this.permissionRepository.create({
      userId: userId,
      permissionId: permission,
    });

    await this.permissionRepository.save(userPermissionCreated);
  }
}
