import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { GlobalTexts } from 'src/data/constants/texts';
import { HttpExceptionService } from 'src/data/services/http-exception/http-exception.service';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>,
    public globalTexts: GlobalTexts,
    public httpExceptionService: HttpExceptionService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.user.findOne({
      where: { email: createUserDto.email },
    });
    try {
      if (userExists) {
        this.logger.error(this.globalTexts.existingElement, '');
        this.httpExceptionService.httpException(
          this.globalTexts.existingElement,
          HttpStatus.CONFLICT,
        );
      } else {
        await this.user.save(createUserDto);
        return { response: this.globalTexts.elementCreatedSuccessfully };
      }
    } catch (error) {
      this.logger.error(this.globalTexts.anErrorOccurred, error.stack);
      this.httpExceptionService.httpException(
        error.message,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  findAll() {
    try {
      return this.user.find();
    } catch (error) {
      this.logger.error(this.globalTexts.anErrorOccurred, error.stack);
      this.httpExceptionService.httpException(
        error.message,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findOne(id: any) {
    console.log(id, '12222222');

    const user = await this.user.findOne({
      where: { id: id },
    });
    try {
      if (!user) {
        this.logger.error(this.globalTexts.idDoesNotExist, '');
        this.httpExceptionService.httpException(
          this.globalTexts.idDoesNotExist,
          HttpStatus.BAD_REQUEST,
        );
      } else {
        return user;
      }
    } catch (error) {
      this.logger.error(this.globalTexts.anErrorOccurred, error.stack);
      this.httpExceptionService.httpException(
        error.message,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async update(updateUserDto: UpdateUserDto) {
    await this.findOne(updateUserDto.id);
    try {
      const user = await this.user.findOne({
        where: [{ email: updateUserDto.email }],
      });
      if (user && user.id !== updateUserDto.id) {
        console.log('error');

        this.logger.error(this.globalTexts.existingElement, '');
        this.httpExceptionService.httpException(
          this.globalTexts.existingElement,
          HttpStatus.CONFLICT,
        );
      }
      await this.user.update(updateUserDto.id, updateUserDto);
      return { response: this.globalTexts.updateSuccessful };
    } catch (error) {
      this.logger.error(this.globalTexts.anErrorOccurred, error.stack);
      this.httpExceptionService.httpException(
        error.message,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async remove(id: any) {
    await this.findOne(id);
    try {
      await this.user.delete(id);
      return { response: this.globalTexts.removalSuccessful };
    } catch (error) {
      this.logger.error(this.globalTexts.anErrorOccurred, error.stack);
      this.httpExceptionService.httpException(
        error.message,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
