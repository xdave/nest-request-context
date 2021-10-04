import { Type } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';

export interface IAsyncContextProvider {
  contextClass: Type<any>;
  asyncContext: AsyncLocalStorage<any>;
}
