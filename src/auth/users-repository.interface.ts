import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

export abstract class UsersRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  protected abstract isDuplicated(error: any): boolean;

  abstract createUser(authCredentialsDto: AuthCredentialsDto): Promise<void>;
}
