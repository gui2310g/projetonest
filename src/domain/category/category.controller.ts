import { Controller, Get, Post,Body, Param, Delete, Query, Put, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { PaginationDto } from 'src/application/dto/pagination.dto';
import { CategoryResponseDto } from 'src/application/dto/category/category-response.dto';
import { CategoryRequestDto } from 'src/application/dto/category/category-request.dto';
import { RolesGuard } from 'src/infra/guards/roles.guard';
import { UserRole } from '../user/User.entity';
import { Roles } from 'src/infra/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { PaginatedResponse } from 'src/shared/interfaces/PaginatedResponse';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.USER)
  create(@Body() dto: CategoryRequestDto): Promise<CategoryResponseDto> {
    return this.categoryService.create(dto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.USER)
  findAll(@Query() pagination: PaginationDto): Promise<PaginatedResponse<CategoryResponseDto[]>> {
    return this.categoryService.findAll(pagination);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.USER)
  findOne(@Param('id') id: number): Promise<CategoryResponseDto> {
    return this.categoryService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.USER)
  update(@Param('id') id: number, @Body() dto: CategoryRequestDto): Promise<CategoryResponseDto> {
    return this.categoryService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.USER)
  remove(@Param('id') id: number) {
    return this.categoryService.remove(id);
  }
}
