import { Category } from "src/domain/category/category.entity";
import { CategoryResponseDto } from "../dto/category/category-response.dto";
import { toProductDetailsDto } from "./product.mapper";

export function toCategoryResponseDto(category: Category): CategoryResponseDto {
    return {
        id: category.id,
        nome: category.nome,
        produtos: category.produtos.map(toProductDetailsDto)
    };
}