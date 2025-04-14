import { ProductDetailsDto } from "../product/product-details.dto";

export class CategoryResponseDto {
    id: number;
    nome: string;
    produtos: ProductDetailsDto[];
}
