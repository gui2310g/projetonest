import { UserRole } from "src/domain/user/User.entity";

export class UserResponseDto {
  id: number;
  nome: string;
  email: string;
  senha: string;
  role: UserRole.USER;
  createdAt: Date;
}