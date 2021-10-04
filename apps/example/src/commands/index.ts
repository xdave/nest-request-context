import { InviteUserToVerifyHandler } from './invite-user-to-verify/invite-user-to-verify.handler';
import { RegisterUserHandler } from './register-user/register-user.handler';
import { SendVerifyEmailHandler } from './send-verify-email/send-verify-email.handler';
import { VerifyRegistrationHandler } from './verify-registration/verify-registration.handler';

export const UserCommandHandlers = [
  RegisterUserHandler,
  InviteUserToVerifyHandler,
  SendVerifyEmailHandler,
  VerifyRegistrationHandler,
];
