import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "../category/category.entity";

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    nome: string;

    @Column({ nullable: false })
    descricao: string;

    @Column({ nullable: false })
    preco: number;

    @Column({ nullable: false })
    estoque_atual: number;

    @Column({ default: 1 })
    estoque_minimo: number;
    
    @ManyToOne(() => Category, (category) => category.produtos, { nullable: false })
    @JoinColumn({ name: 'category_id' })
    categoria: Category 

    @Column({ unique: true })
    sku: string;
}
