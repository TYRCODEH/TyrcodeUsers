import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  id?: any;

  email: string;

  password: string;

  role: 'admin' | 'user';

  createdat: Date;
}
