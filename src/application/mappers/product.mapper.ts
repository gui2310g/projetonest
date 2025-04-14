import { Product } from "src/domain/product/product.entity";
import { ProductResponseDto } from "../dto/product/product-response.dto";
import { ProductRequestDto } from "../dto/product/product-request.dto";
import { Category } from "src/domain/category/category.entity";
import { generateSku } from "src/shared/utils/generateSku.util";
import { ProductDetailsDto } from "../dto/product/product-details.dto";

export function toProductResponseDto(produto: Product): ProductResponseDto {
    return {
        id: produto.id,
        nome: produto.nome,
        descricao: produto.descricao,
        preco: produto.preco,
        estoque_atual: produto.estoque_atual,
        estoque_minimo: produto.estoque_minimo,
        categoria: produto.categoria,
        sku: produto.sku
    };   
}

export function toProductDetailsDto(produto: Product): ProductDetailsDto {
    return {
        id: produto.id,
        nome: produto.nome,
        preco: produto.preco,
        descricao: produto.descricao,
        estoque_atual: produto.estoque_atual,
        estoque_minimo: produto.estoque_minimo,
        sku: produto.sku
    };
}

export function toProductEntity(dto: ProductRequestDto, category: Category): Product {
    const product = new Product();
    product.nome = dto.nome;
    product.descricao = dto.descricao;
    product.preco = dto.preco;
    product.estoque_atual = dto.estoque_atual;
    product.estoque_minimo = dto.estoque_minimo || 1; 
    product.sku = generateSku(dto.nome);
    product.categoria = category;
    return product;
}