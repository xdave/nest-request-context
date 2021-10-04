import { AsyncLocalStorage } from 'async_hooks';

export class AsyncLocalStorageProxyHandler<T extends Record<string, any>>
  implements ProxyHandler<T>
{
  constructor(private readonly asyncContext: AsyncLocalStorage<unknown>) {}

  private get store(): T {
    return this.asyncContext.getStore() as T;
  }

  get<V>(target: T, prop: string, receiver: T): V {
    const result = Reflect.get(this.store ?? {}, prop, this.store ?? {});
    return result !== undefined
      ? result
      : Reflect.get(target ?? {}, prop, receiver ?? {});
  }

  set<V>(_target: T, prop: string, value: V, _receiver: T): boolean {
    return Reflect.set(this.store ?? {}, prop, value, this.store ?? {});
  }
}
