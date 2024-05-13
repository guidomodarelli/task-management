import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from './users-repository.interface';
import { DataSource } from 'typeorm';

@Injectable()
export class UsersPostgresRepository extends UsersRepository {
  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  private readonly DUPLICATED_CODE = 23505;

  protected isDuplicated(error: any): boolean {
    return Number(error.code) === this.DUPLICATED_CODE;
  }

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    // hash
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({
      username,
      password: hashedPassword,
    });

    try {
      await this.save(user);
    } catch (error) {
      if (this.isDuplicated(error)) {
        throw new ConflictException('username already exists');
      }
      throw new InternalServerErrorException();
    }
  }
}
