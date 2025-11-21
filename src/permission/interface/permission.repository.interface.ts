import { UserPermission } from 'src/config/entities/user-permission.entity';
import { DeepPartial } from 'typeorm';

export abstract class IPermissionRepository {
  abstract find(partial: Partial<any>);
  abstract save(user: DeepPartial<UserPermission>): Promise<UserPermission>;
  abstract create(data: DeepPartial<UserPermission>): Promise<UserPermission>;
}
