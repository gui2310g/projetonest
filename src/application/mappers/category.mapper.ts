import { Category } from "src/domain/category/category.entity";
import { CategoryResponseDto } from "../dto/category/category-response.dto";

export function toCategoryResponseDto(category: Category): CategoryResponseDto {
    return {
        id: category.id,
        nome: category.nome,
    };
}