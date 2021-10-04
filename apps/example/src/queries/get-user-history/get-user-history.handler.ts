import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IUserRepository } from '../../repository/user-repository.interface';
import { GetUserHistory } from './get-user-history.query';
import { GetUserHistoryResponse } from './get-user-history.response';

@QueryHandler(GetUserHistory)
export class GetUserHistoryHandler implements IQueryHandler<GetUserHistory> {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(query: GetUserHistory): Promise<GetUserHistoryResponse> {
    return new GetUserHistoryResponse(
      await this.userRepository.getHistoryById(query.userId),
    );
  }
}
