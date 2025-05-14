import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';

/**
 * 认证控制器
 * 
 * 处理用户认证相关的HTTP请求
 */
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * 用户登录
   * 
   * @param loginDto 登录信息
   * @returns 包含用户信息和JWT令牌的对象
   */
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  /**
   * 用户注册
   * 
   * @param createUserDto 注册信息
   * @returns 包含用户信息和JWT令牌的对象
   */
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
}
