import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt } from 'passport-jwt';

/**
 * JWT策略
 * 
 * 用于验证JWT令牌的策略
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    const jwtSecret = configService.get<string>('JWT_SECRET') || 'fallback_secret_key_for_dev_only';
    
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  /**
   * 验证JWT令牌，并返回用户信息
   * 
   * @param payload JWT令牌载荷
   * @returns 用户信息
   */
  async validate(payload: any) {
    return { id: payload.sub, username: payload.username };
  }
}
