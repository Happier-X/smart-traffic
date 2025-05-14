import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * Prisma服务
 * 
 * 这个服务封装了Prisma客户端，用于在应用中操作数据库
 * 它实现了OnModuleInit和OnModuleDestroy接口，以便在应用启动和关闭时
 * 正确地连接和断开与数据库的连接
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  /**
   * 在模块初始化时连接数据库
   */
  async onModuleInit() {
    await this.$connect();
  }

  /**
   * 在模块销毁时断开数据库连接
   */
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
