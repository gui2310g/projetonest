import { User } from "src/domain/user/User.entity";
import { UserDetailsDto } from "../dto/users/user-details.dto";

export function toUserDetailsDto(user: User): UserDetailsDto {
    return {
        id: user.id,
        nome: user.nome,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
    };
}