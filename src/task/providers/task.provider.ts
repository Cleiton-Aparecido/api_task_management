import { Provider } from '@nestjs/common';

import { TaskService } from '../service/task.service';
import { TaskUseCase } from '../service/task.usecase';

export const TaskUseCaseProvider: Provider = {
  provide: TaskUseCase,
  useClass: TaskService,
};
