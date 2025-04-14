import { Category } from "src/domain/category/category.entity";

export class ProductResponseDto {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    estoque_atual: number;
    estoque_minimo: number;
    categoria: Category;
    sku: string;
}
