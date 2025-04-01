import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from 'src/domain/user/User.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async create(user: Partial<User>): Promise<User> {
    const newUser = this.userRepository.create(user);

    if (await this.userRepository.findOne({ where: { email: user.email } }))
      throw new ConflictException('Email ja existe');

    newUser.createdAt = new Date();
    newUser.role = UserRole.USER;
    return this.userRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    if ((await this.userRepository.find()).length === 0)
      throw new NotFoundException('Não há usuarios');

    return this.userRepository.find();
  }

  async findById(id: number): Promise<User | null> {
    if ((await this.userRepository.findOne({ where: { id } })) === null)
      throw new NotFoundException('Não foi encontrado usuario com id: ' + id);

    return this.userRepository.findOne({ where: { id } });
  }

  async update(id: number, user: Partial<User>): Promise<User | null> {
    await this.findById(id);

    if (await this.isAdmin(id)) throw new BadRequestException('Não se pode atualizar o admin');

    await this.userRepository.update(id, user);
    return this.userRepository.findOne({ where: { id } });
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
