import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { HttpExceptionService } from 'src/data/services/http-exception/http-exception.service';
import { GlobalTexts } from 'src/data/constants/texts';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, HttpExceptionService, GlobalTexts],
  exports: [TypeOrmModule],
})
export class UsersModule {}
