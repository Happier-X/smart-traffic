import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

/**
 * 用户服务
 * 
 * 提供用户相关的功能，包括创建用户和查找用户
 */
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  /**
   * 创建新用户
   * 
   * @param createUserDto 用户注册信息
   * @returns 创建的用户（不含密码）
   */
  async create(createUserDto: CreateUserDto) {
    // 检查用户名是否已存在
    const existingUser = await this.prisma.user.findUnique({
      where: { username: createUserDto.username },
    });

    if (existingUser) {
      throw new ConflictException('用户名已存在');
    }

    // 对密码进行哈希处理
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // 创建用户并返回（不含密码）
    const user = await this.prisma.user.create({
      data: {
        username: createUserDto.username,
        password: hashedPassword,
      },
    });

    const { password, ...result } = user;
    return result;
  }

  /**
   * 根据用户名查找用户
   * 
   * @param username 用户名
   * @returns 找到的用户（含密码，用于验证）
   */
  async findByUsername(username: string) {
    const user = await this.prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      throw new NotFoundException('用户不存在');
    }

    return user;
  }
}
