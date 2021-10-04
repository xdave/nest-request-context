/* eslint-disable @typescript-eslint/ban-types */

import { v4 } from 'uuid';
import { requestContext } from '../context/request-context.storage';
import { IContextual } from '../interfaces/contextual.interface';
import { createTimestamp } from '../utils/create-timestamp.util';

export abstract class BaseEvent<T extends object = any> implements IContextual {
  id = v4();
  name = this.constructor.name;
  timestamp = createTimestamp();
  context = requestContext.getStore();

  constructor(readonly aggregateId: string, public data: T) {}
}
