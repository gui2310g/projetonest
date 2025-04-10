import { Column, Entity, PrimaryGeneratedColumn,} from "typeorm";

@Entity("categories")
export class Category {
    @Column()
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    nome: string;
}
