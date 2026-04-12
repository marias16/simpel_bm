import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'simpel_bm_secret_key',
    });
  }

  async validate(payload: any) {
    return {
      id_usuario: payload.id_usuario,
      email: payload.email,
      rol: payload.rol,
    };
  }
}