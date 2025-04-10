import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { CategoryRequestDto } from 'src/application/dto/category/category-request.dto';
import { CategoryResponseDto } from 'src/application/dto/category/category-response.dto';
import { toCategoryResponseDto } from 'src/application/mappers/category.mapper';
import { PaginationDto } from 'src/application/dto/pagination.dto';
import { paginate } from 'src/shared/utils/paginate.util';
import { PaginatedResponse } from 'src/shared/interfaces/PaginatedResponse';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) 
    private readonly categoryRepository: Repository<Category>
  ) {}


  async create(category: CategoryRequestDto): Promise<CategoryResponseDto> {
    const createdCategory = this.categoryRepository.create(category);

    if(await this.findByNome(category.nome)) throw new ConflictException('Categoria já existe');

    const savedCategory = await this.categoryRepository.save(createdCategory);
    
    return toCategoryResponseDto(savedCategory);
  }

  async findAll(pagination: PaginationDto): Promise<PaginatedResponse<CategoryResponseDto[]>> {
    const paginatedResult = await paginate<Category>(this.categoryRepository, pagination);
    const { data: categories } = paginatedResult;

    if (categories.length === 0) throw new NotFoundException('Não há categorias');

    return {
      data: categories.map(toCategoryResponseDto),
      total: paginatedResult.total,
      limit: paginatedResult.limit,
      offset: paginatedResult.offset,
      nextPage: paginatedResult.nextPage,
    };
  }

  async findOne(id: number): Promise<CategoryResponseDto> {
    const category = await this.categoryRepository.findOne({ where: { id } });

    if (!category) throw new NotFoundException('Não foi encontrado categoria com id: ' + id);

    return toCategoryResponseDto(category);
  }

  async update(id: number, dto: CategoryRequestDto): Promise<CategoryResponseDto> {
    await this.categoryRepository.update(id, dto);

    const category = await this.categoryRepository.findOne({ where: { id } });
    
    if (!category) throw new NotFoundException('Não foi encontrado categoria com id: ' + id);

    return toCategoryResponseDto(category);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.categoryRepository.delete(id);
  }

  private findByNome(nome: string): Promise<Category | null> {
    return this.categoryRepository.findOne({ where: { nome: nome } });
  }
}
