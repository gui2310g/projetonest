import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserDetailsDto } from 'src/application/dto/users/user-details.dto';
import { UserRequestDto } from 'src/application/dto/users/user-request.dto';
import { UserResponseDto } from 'src/application/dto/users/user-response.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<UserDetailsDto[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<UserDetailsDto | null> {
    return this.userService.findById(id);
  }

  @Post()
  create(@Body() userData: UserRequestDto): Promise<UserResponseDto> {
    return this.userService.create(userData);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() user: UserRequestDto): Promise<UserResponseDto | null> {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.userService.delete(id);
  }
}
