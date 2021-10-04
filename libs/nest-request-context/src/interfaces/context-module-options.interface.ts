import { ModuleMetadata } from '@nestjs/common';
import { IAsyncContextProvider } from './async-context.provider';

export interface IContextModuleOptions {
  imports?: ModuleMetadata['imports'];
  providers?: ModuleMetadata['providers'];
  contexts: IAsyncContextProvider[];
}
