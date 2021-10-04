import { IUserHistoryProjection } from '../../interfaces/user-history-projection.interface';

export class GetUserHistoryResponse {
  constructor(readonly data: IUserHistoryProjection) {}
}
