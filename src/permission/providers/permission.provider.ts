import { Provider } from '@nestjs/common';

import { PermissionService } from '../service/permission.service';
import { PermissionUseCase } from '../service/permission.usecase';

export const PermissionUseCaseProvider: Provider = {
  provide: PermissionUseCase,
  useClass: PermissionService,
};
