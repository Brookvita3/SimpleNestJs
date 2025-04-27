import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  login(body: LoginDto) {
    const adminEmail = this.configService.get<string>('ADMIN_EMAIL');
    const adminPassword = this.configService.get<string>('ADMIN_PASSWORD');
    const clientEmail = this.configService.get<string>('CLIENT_EMAIL');
    const clientPassword = this.configService.get<string>('CLIENT_PASSWORD');
    const jwtSecret = this.configService.get<string>('JWT_SECRET');

    if (body.email === adminEmail && body.password === adminPassword) {
      const payload = { sub: 'admin', email: body.email, role: 'admin' };
      const access_token = this.jwtService.sign(payload, {
        secret: jwtSecret,
      });
      return { access_token };
    }

    if (body.email === clientEmail && body.password === clientPassword) {
      const payload = { sub: 'client', email: body.email, role: 'client' };
      const access_token = this.jwtService.sign(payload, {
        secret: jwtSecret,
      });
      return { access_token };
    }

    throw new UnauthorizedException('Invalid credentials');
  }
}
