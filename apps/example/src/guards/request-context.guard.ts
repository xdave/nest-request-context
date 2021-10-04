import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { v4 } from 'uuid';
import { requestContext } from '../context/request-context.storage';
import { createTimestamp } from '../utils/create-timestamp.util';

@Injectable()
export class RequestContextGuard implements CanActivate {
  canActivate(
    _context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    requestContext.enterWith({
      correlationId: v4(),
      timestamp: createTimestamp(),
    });
    return true;
  }
}
