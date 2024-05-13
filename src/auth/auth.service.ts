import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersPostgresRepository } from './users.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { compare as comparePasswords } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { UsersRepository } from './users-repository.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersPostgresRepository)
    private userRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async singUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.createUser(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto;
    const user = await this.userRepository.findOneBy({ username });

    if (user && (await comparePasswords(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken = await this.jwtService.signAsync(payload);
      return { accessToken };
    }

    throw new UnauthorizedException('Please check your login credentials');
  }
}
