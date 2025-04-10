import { PaginationDto } from "src/application/dto/pagination.dto"
import { Repository } from "typeorm"
import { ObjectLiteral } from "typeorm";

export async function paginate<T extends ObjectLiteral>(
    repository: Repository<T>, 
    page: PaginationDto
): Promise<{ data: T[]; total: number; limit: number; offset: number; nextPage: number | null }> {
    const { limit = 10, offset = 0 } = page;

    const [products, total] = await repository.findAndCount({
      take: limit,
      skip: offset,
    });

    return {
      data: products,
      total: total,
      limit,
      offset,
      nextPage: total > offset + limit ? offset + limit : null,
    };
}