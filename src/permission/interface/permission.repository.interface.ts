import { DeepPartial } from 'typeorm';

export abstract class IPermissionRepository {
  abstract find(partial: Partial<any>);
  // abstract save(any: DeepPartial<any>): Promise<any>;
  // abstract create(data: DeepPartial<any>): any;
}
