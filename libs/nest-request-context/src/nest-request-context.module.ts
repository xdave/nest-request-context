import { DynamicModule, Module } from '@nestjs/common';
import { IContextModuleOptions } from './interfaces/context-module-options.interface';
import { createAsyncLocalStorageProxy } from './utils/create-async-local-storage-proxy.util';

@Module({})
export class NestRequestContextModule {
  static forRoot(options: IContextModuleOptions): DynamicModule {
    return {
      global: true,
      module: NestRequestContextModule,
      imports: options.imports,
      providers: options.contexts.flatMap(({ contextClass, asyncContext }) => [
        ...(options.providers ?? []),
        {
          provide: `${contextClass.name}InitialInstance`,
          useClass: contextClass,
        },
        {
          provide: contextClass,
          inject: [`${contextClass.name}InitialInstance`],
          useFactory: (initialInstance: InstanceType<typeof contextClass>) =>
            createAsyncLocalStorageProxy(initialInstance, asyncContext),
        },
      ]),
      exports: options.contexts.map(({ contextClass }) => contextClass),
    };
  }
}
