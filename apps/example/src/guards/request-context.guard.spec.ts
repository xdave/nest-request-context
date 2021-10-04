import { RequestContextGuard } from './request-context.guard';

describe('RequestContextGuard', () => {
  it('should be defined', () => {
    expect(new RequestContextGuard()).toBeDefined();
  });
});
