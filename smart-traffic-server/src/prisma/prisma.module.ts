import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

/**
 * Prisma模块
 * 
 * 这个模块导出PrismaService，以便其他模块可以使用它来操作数据库
 */
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
