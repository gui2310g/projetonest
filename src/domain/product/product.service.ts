import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductRequestDto } from 'src/application/dto/product/product-request.dto';
import { ProductResponseDto } from 'src/application/dto/product/product-response.dto';
import { Category } from '../category/category.entity';
import { toProductEntity, toProductResponseDto } from 'src/application/mappers/product.mapper';
import { PaginationDto } from 'src/application/dto/pagination.dto';
import { PaginatedResponse } from 'src/shared/interfaces/PaginatedResponse';
import { paginate } from 'src/shared/utils/paginate.util';
import { ProductDetailsDto } from 'src/application/dto/product/product-details.dto';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product) 
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) {}

  async create(dto: ProductRequestDto): Promise<ProductResponseDto> {
    const category = await this.categoryRepository.findOneBy({ id: dto.categoriaId });
  
    if (!category) throw new NotFoundException('Categoria não encontrada');
  
    const product = toProductEntity(dto, category);
  
    const createdProduct = await this.productRepository.save(product);
  
    return toProductResponseDto(createdProduct);
  }

  async findAll(pagination: PaginationDto): Promise<PaginatedResponse<ProductDetailsDto[]>> {
    const paginatedResult = await paginate<Product>(this.productRepository, pagination);
    const { data: products } = paginatedResult;

    if(products.length === 0) throw new NotFoundException('Não há produtos');

    return {
      data: products.map(toProductResponseDto),
      total: paginatedResult.total,
      limit: paginatedResult.limit,
      offset: paginatedResult.offset,
      nextPage: paginatedResult.nextPage,
    };
  }

  async findOne(id: number): Promise<ProductResponseDto> {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) throw new NotFoundException('Não foi encontrado produto com id: ' + id);

    return toProductResponseDto(product);
  }

  async update(id: number, dto: ProductRequestDto): Promise<ProductResponseDto> {
    await this.productRepository.update(id, dto);

    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) throw new NotFoundException('Não foi encontrado produto com id: ' + id);

    return toProductResponseDto(product);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.productRepository.delete(id);
  }
}


