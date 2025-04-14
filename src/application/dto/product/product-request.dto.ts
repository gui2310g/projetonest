export class ProductRequestDto {
    nome: string;
    descricao: string;
    preco: number;
    estoque_atual: number
    estoque_minimo?: number;
    categoriaId: number
}
