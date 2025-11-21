import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { IUsersRepository } from 'src/users/interfaces/users.repository.interface';
import { UsersRepository } from 'src/users/repository/users.repository';
import { AuthDto } from '../dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(IUsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async validateEmail(auth: AuthDto): Promise<any> {
    const { email, password } = auth;

    const user = await this.usersRepository.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(auth: AuthDto): Promise<{ access_token: string }> {
    try {
      const user = await this.validateEmail(auth);
      if (!user) {
        throw new UnauthorizedException('Usuário ou senha inválidos');
      }

      const isAdmin = user.permissions.some((p) => p === 'ADMIN');

      const payload = {
        name: user.name,
        email: user.email,
        id: user.id,
        admin: isAdmin,
      };
      console.log(payload);
      return {
        access_token: this.jwtService.sign(payload, { expiresIn: '3h' }),
      };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
