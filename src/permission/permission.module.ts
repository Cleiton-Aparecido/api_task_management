import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from 'src/config/entities/permissions.entity';
import { UserPermission } from 'src/config/entities/user-permission.entity';
import { IPermissionRepository } from './interface/permission.repository.interface';
import { PermissionUseCaseProvider } from './providers/permission.provider';
import { PermissionRepository } from './repository/permission.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Permission]),
    TypeOrmModule.forFeature([UserPermission]),
  ],
  controllers: [],
  providers: [
    PermissionUseCaseProvider,
    {
      provide: IPermissionRepository,
      useClass: PermissionRepository,
    },
  ],
  exports: [IPermissionRepository, PermissionUseCaseProvider],
})
export class PermissionModule {}
