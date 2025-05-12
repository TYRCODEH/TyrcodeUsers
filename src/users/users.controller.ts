import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('create_user')
  create(@Payload() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @MessagePattern('list_users')
  findAll() {
    return this.usersService.findAll();
  }

  @MessagePattern('list_users_id')
  findOne(@Payload() id: any) {
    console.log(id, 'zzzzzzzzzzz');

    return this.usersService.findOne(id);
  }

  @MessagePattern('update_users')
  update(@Payload() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto);
  }

  @MessagePattern('delete_users')
  remove(@Payload() id: any) {
    return this.usersService.remove(id);
  }
}
