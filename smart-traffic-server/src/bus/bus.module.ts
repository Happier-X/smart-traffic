import { Module } from '@nestjs/common';
import { BusService } from './bus.service';
import { BusController } from './bus.controller';
import { PrismaModule } from '../prisma/prisma.module';

/**
 * 公交模块
 * 
 * 提供公交路线相关功能，依赖PrismaModule
 */
@Module({
  imports: [PrismaModule],
  controllers: [BusController],
  providers: [BusService],
  exports: [BusService],
})
export class BusModule {}
