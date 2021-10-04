import { APP_GUARD } from '@nestjs/core';
import { RequestContextGuard } from './request-context.guard';

export const RequestContextGuardProvider = {
  provide: APP_GUARD,
  useClass: RequestContextGuard,
};
