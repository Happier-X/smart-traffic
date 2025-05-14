import { Module } from '@nestjs/common';
import { ParkingService } from './parking.service';
import { ParkingController } from './parking.controller';
import { PrismaModule } from '../prisma/prisma.module';

/**
 * 停车场模块
 * 
 * 提供停车场相关功能，依赖PrismaModule
 */
@Module({
  imports: [PrismaModule],
  controllers: [ParkingController],
  providers: [ParkingService],
  exports: [ParkingService],
})
export class ParkingModule {}
