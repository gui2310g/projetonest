import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/domain/user/user.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {}

    async login(email: string, password: string): Promise<{token: string}> {
      const user = await this.userService.findByEmail(email);

      if (!user || !(await bcrypt.compare(password, user.senha))) 
        throw new UnauthorizedException('Usuário ou senha inválido');
      
      const payload = { sub: user.id, username: user.email };

      return { token: await this.jwtService.signAsync(payload) };
    }
}
