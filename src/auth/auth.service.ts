import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private userRepository: UsersRepository,
  ) {}

  async singUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.createUser(authCredentialsDto);
  }

  async isSamePassword(
    passwordDto: string,
    userPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(passwordDto, userPassword);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    // Promise<string> for token
    const { username, password } = authCredentialsDto;
    const user = await this.userRepository.findOneBy({ username });

    if (user && this.isSamePassword(password, user.password)) {
      return 'success';
    }

    throw new UnauthorizedException('Please check your login credentials');
  }
}
