import { IsEmail, IsString } from 'class-validator';

export class RegisterUserRequest {
  @IsString() name!: string;
  @IsEmail() emailAddress!: string;
}
