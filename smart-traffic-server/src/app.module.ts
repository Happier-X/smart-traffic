import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BusModule } from './bus/bus.module';
import { ParkingModule } from './parking/parking.module';

/**
 * 应用主模块
 * 
 * 集成所有功能模块
 */
@Module({
  imports: [
    // 配置模块，加载环境变量
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    UsersModule,
    AuthModule,
    BusModule,
    ParkingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
