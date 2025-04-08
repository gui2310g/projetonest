import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserDetailsDto } from 'src/application/dto/users/user-details.dto';
import { UserRequestDto } from 'src/application/dto/users/user-request.dto';
import { UserResponseDto } from 'src/application/dto/users/user-response.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/infra/decorators/roles.decorator';
import { UserRole } from './User.entity';
import { RolesGuard } from 'src/infra/guards/roles.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  findAll(): Promise<UserDetailsDto[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  findOne(@Param('id') id: number): Promise<UserDetailsDto | null> {
    return this.userService.findById(id);
  }

  @Post()
  create(@Body() userData: UserRequestDto): Promise<UserResponseDto> {
    return this.userService.create(userData);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.USER)
  update(@Param('id') id: number, @Body() user: UserRequestDto): Promise<UserResponseDto | null> {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  delete(@Param('id') id: number): Promise<void> {
    return this.userService.delete(id);
  }
}
