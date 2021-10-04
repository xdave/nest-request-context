import { Injectable } from '@nestjs/common';
import { IRequestContext } from '../interfaces/request-context.interface';

@Injectable()
export class RequestContext implements IRequestContext {
  correlationId!: string;
  timestamp!: number;

  toJSON(): IRequestContext {
    return {
      correlationId: this.correlationId,
      timestamp: this.timestamp,
    };
  }
}
