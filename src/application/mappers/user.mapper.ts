import { User, UserRole } from "src/domain/user/User.entity";
import { UserDetailsDto } from "../dto/users/user-details.dto";
import { UserResponseDto } from "../dto/users/user-response.dto";

export function toUserDetailsDto(user: User): UserDetailsDto {
    return {
        id: user.id,
        nome: user.nome,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
    };
}

export function toUserResponseDTO(user: User): UserResponseDto {
    return {
        id: user.id,
        nome: user.nome,
        email: user.email,
        role: UserRole.USER,
        senha: user.senha,
        createdAt: user.createdAt,
    };
}