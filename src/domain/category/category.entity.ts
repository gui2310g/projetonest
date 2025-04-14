import { Column, Entity, OneToMany, PrimaryGeneratedColumn,} from "typeorm";
import { Product } from "../product/product.entity";

@Entity("categories")
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    nome: string;

    @OneToMany(() => Product, (product) => product.categoria)
    produtos: Product[]
}
