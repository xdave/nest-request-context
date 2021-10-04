import { IsUUID } from 'class-validator';

export class VerifyRegistrationRequest {
  @IsUUID('4') userId!: string;
}
