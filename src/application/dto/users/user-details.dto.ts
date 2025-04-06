import { UserRole } from "src/domain/user/User.entity";

export class UserDetailsDto {
  id: number;
  nome: string;
  email: string;
  role: UserRole;
  createdAt: Date;
}