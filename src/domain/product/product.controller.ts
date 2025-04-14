import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductRequestDto } from 'src/application/dto/product/product-request.dto';
import { ProductResponseDto } from 'src/application/dto/product/product-response.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/infra/guards/roles.guard';
import { Roles } from 'src/infra/decorators/roles.decorator';
import { UserRole } from '../user/User.entity';
import { PaginationDto } from 'src/application/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interfaces/PaginatedResponse';
import { ProductDetailsDto } from 'src/application/dto/product/product-details.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.USER)
  create(@Body() dto: ProductRequestDto): Promise<ProductResponseDto> {
    return this.productService.create(dto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.USER)
  findAll(pagination: PaginationDto): Promise<PaginatedResponse<ProductDetailsDto[]>> {
    return this.productService.findAll(pagination);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.USER)
  findOne(@Param('id') id: number): Promise<ProductResponseDto> {
    return this.productService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.USER)
  update(@Param('id') id: number, @Body() dto: ProductRequestDto): Promise<ProductResponseDto> {
    return this.productService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.USER)
  remove(@Param('id') id: number) {
    return this.productService.remove(id);
  }
}
