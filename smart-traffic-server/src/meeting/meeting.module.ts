import { Module } from '@nestjs/common';
import { MeetingService } from './meeting.service';
import { MeetingController } from './meeting.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [MeetingController],
  providers: [MeetingService, PrismaService],
})
export class MeetingModule {}
