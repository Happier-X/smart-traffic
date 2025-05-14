import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaModule } from '../prisma/prisma.module';

/**
 * 用户模块
 * 
 * 提供用户相关功能，依赖PrismaModule
 */
@Module({
  imports: [PrismaModule],
  providers: [UsersService],
  exports: [UsersService], // 导出用户服务以便其他模块使用
})
export class UsersModule {}
