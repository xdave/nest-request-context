import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RegisterUser } from './commands/register-user/register-user.command';
import { RegisterUserRequest } from './commands/register-user/register-user.request';
import { RegisterUserResponse } from './commands/register-user/register-user.response';
import { VerifyRegistration } from './commands/verify-registration/verify-registration.command';
import { VerifyRegistrationRequest } from './commands/verify-registration/verify-registration.request';
import { GetUserHistory } from './queries/get-user-history/get-user-history.query';

@Controller({ version: '1' })
export class ExampleController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('register')
  async registerUser(
    @Body() request: RegisterUserRequest,
  ): Promise<RegisterUserResponse> {
    return await this.commandBus.execute(new RegisterUser(request));
  }

  @Post('verify')
  async verifyUser(@Body() request: VerifyRegistrationRequest): Promise<void> {
    return await this.commandBus.execute(new VerifyRegistration(request));
  }

  @Get('history/:userId')
  async userHistory(@Param('userId') userId: string) {
    return await this.queryBus.execute(new GetUserHistory(userId));
  }
}
