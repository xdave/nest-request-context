import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { IUserHistoryProjection } from '../interfaces/user-history-projection.interface';
import { BaseEvent } from '../models/base-event.model';
import { User } from '../models/user.model';
import { IUserRepository } from './user-repository.interface';

const userEvents: BaseEvent[] = [];
const userHistoryProjections = new Map<string, IUserHistoryProjection>();

@Injectable()
export class InMemoryUserRepository implements IUserRepository {
  constructor(private readonly eventPublisher: EventPublisher<BaseEvent>) {}

  async findOneById(userId: string): Promise<User> {
    const history = userEvents.filter((event) => event.aggregateId === userId);
    if (history.length === 0) {
      throw new Error(`User with id "${userId}" not found`);
    }
    const user = new User();
    user.loadFromHistory(history);
    return user;
  }

  async save(user: User): Promise<void> {
    const history = user.getUncommittedEvents();
    userEvents.push(...history);
    this.eventPublisher.mergeObjectContext(user).commit();
  }

  async getHistoryById(userId: string): Promise<IUserHistoryProjection> {
    const projection = userHistoryProjections.get(userId);
    if (!projection) {
      throw new Error(`User with id "${userId}" not found`);
    }
    return projection;
  }

  async saveUserHistoryProjection(event: BaseEvent): Promise<void> {
    const item = userHistoryProjections.get(event.aggregateId) ?? {
      user: undefined,
      history: [],
    };
    item.history.push(event);
    const user = new User();
    user.loadFromHistory(item.history);
    item.user = user;
    userHistoryProjections.set(event.aggregateId, item);
  }
}
