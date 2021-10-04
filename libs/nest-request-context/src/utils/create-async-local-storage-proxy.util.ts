import { AsyncLocalStorage } from 'async_hooks';
import { AsyncLocalStorageProxyHandler } from './async-local-storage-proxy.handler';

export const createAsyncLocalStorageProxy = <T extends Record<string, any>>(
  initialInstance: T,
  asyncContext: AsyncLocalStorage<unknown>,
): T =>
  new Proxy<T>(
    initialInstance,
    new AsyncLocalStorageProxyHandler(asyncContext),
  );
