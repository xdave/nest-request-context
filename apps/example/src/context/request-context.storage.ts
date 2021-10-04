import { AsyncLocalStorage } from 'async_hooks';
import { IRequestContext } from '../interfaces/request-context.interface';

export const requestContext = new AsyncLocalStorage<IRequestContext>();
