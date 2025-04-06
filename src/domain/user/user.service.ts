import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from 'src/domain/user/User.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserDetailsDto } from 'src/application/dto/users/user-details.dto';
import { UserRequestDto } from 'src/application/dto/users/user-request.dto';
import { UserResponseDto } from 'src/application/dto/users/user-response.dto';
import { toUserDetailsDto, toUserResponseDTO } from 'src/application/mappers/user.mapper';

@Injectable()
export class UserService {
  saltOrRounds: number = 10;

  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async create(user: UserRequestDto): Promise<UserResponseDto> {
    if (!user.email || !user.senha) throw new BadRequestException('Email e senha obrigatório');

    if (await this.findByEmail(user.email)) throw new ConflictException('Email já existe');

    const newUser = this.userRepository.create({
      ...user,
      senha: await bcrypt.hash(user.senha, this.saltOrRounds),
      createdAt: new Date(),
      role: UserRole.USER,
    });

    const savedUser = await this.userRepository.save(newUser);

    return toUserResponseDTO(savedUser);
  }

  async findAll(): Promise<UserDetailsDto[]> {
    if ((await this.userRepository.find()).length === 0)
      throw new NotFoundException('Não há usuarios');

    const users = (await this.userRepository.find()).filter((user) => user.role !== UserRole.ADMIN)

    return users.map(toUserDetailsDto);
  }

  async findById(id: number): Promise<UserDetailsDto | null> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) throw new NotFoundException('Não foi encontrado usuario com id: ' + id);
    
    return toUserDetailsDto(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async update(id: number, user: UserRequestDto): Promise<UserResponseDto | null> {
    if (await this.isAdmin(id)) throw new BadRequestException('Não se pode atualizar o admin');

    if (user.senha) user.senha = await bcrypt.hash(user.senha, this.saltOrRounds);

    await this.userRepository.update(id, user);

    const updatedUser = await this.userRepository.findOne({ where: { id } });

    if (!updatedUser) throw new NotFoundException('Não foi encontrado usuario com id: ' + id);

    return toUserResponseDTO(updatedUser);
  }

  async delete(id: number): Promise<void> {
    await this.findById(id);
    if (await this.isAdmin(id)) throw new BadRequestException('Não se pode deletar o admin');
    await this.userRepository.delete(id);
  }

  private async isAdmin(userId: number): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    return user?.role === UserRole.ADMIN;
  }
}
