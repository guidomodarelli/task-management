import { IsString, IsStrongPassword, Length, Matches } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @Length(4, 28)
  username: string;

  @IsString()
  @Length(8, 32)
  @IsStrongPassword(
    {
      minLowercase: 1,
      minSymbols: 1,
      minNumbers: 1,
      minUppercase: 1,
    },
    {
      message:
        'password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character',
    },
  )
  password: string;
}
