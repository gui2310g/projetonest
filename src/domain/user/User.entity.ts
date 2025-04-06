import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn } from "typeorm";

export enum UserRole {
    ADMIN = "admin",
    USER = "usuario",
}

@Entity("users")
@Unique(["email"])
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    nome: string;

    @Column({nullable: false})
    email: string

    @Column({nullable: false})
    senha: string

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.USER
    })
    role: UserRole;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}