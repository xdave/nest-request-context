import { performance } from 'perf_hooks';

export const createTimestamp = () => performance.timeOrigin + performance.now();
