import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

/**
 * 认证服务
 * 
 * 提供用户认证功能，包括登录和用户注册
 */
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * 验证用户
   * 
   * @param username 用户名
   * @param password 明文密码
   * @returns 验证通过的用户信息（不含密码）
   */
  async validateUser(username: string, password: string) {
    try {
      // 查找用户
      const user = await this.usersService.findByUsername(username);

      // 验证密码
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        // 返回用户信息，但不包含密码
        const { password, ...result } = user;
        return result;
      }
      
      return null;
    } catch (error) {
      return null;
    }
  }

  /**
   * 用户登录
   * 
   * @param loginDto 登录信息
   * @returns 包含用户信息和JWT令牌的对象
   */
  async login(loginDto: LoginDto) {
    // 验证用户
    const user = await this.validateUser(loginDto.username, loginDto.password);
    
    if (!user) {
      throw new UnauthorizedException('用户名或密码不正确');
    }

    // 创建 JWT 载荷
    const payload = { sub: user.id, username: user.username };
    
    return {
      user,
      token: this.jwtService.sign(payload),
    };
  }

  /**
   * 用户注册
   * 
   * @param createUserDto 注册信息
   * @returns 包含用户信息和JWT令牌的对象
   */
  async register(createUserDto: CreateUserDto) {
    // 创建新用户
    const user = await this.usersService.create(createUserDto);
    
    // 创建 JWT 载荷
    const payload = { sub: user.id, username: user.username };
    
    return {
      user,
      token: this.jwtService.sign(payload),
    };
  }
}
