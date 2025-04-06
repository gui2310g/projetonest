import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from './User.entity';
import { UserRequestDto, UserResponseDto } from 'src/application/users/user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<User | null> {
    return this.userService.findById(Number(id));
  }

  @Post()
  create(@Body() userData: UserRequestDto): Promise<UserResponseDto> {
    return this.userService.create(userData);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() user: UserRequestDto): Promise<UserResponseDto | null> {
    return this.userService.update(Number(id), user);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.userService.delete(Number(id));
  }
}
