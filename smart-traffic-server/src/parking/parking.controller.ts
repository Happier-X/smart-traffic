import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ParkingService } from './parking.service';
import { CreateParkingLotDto } from './dto/create-parking-lot.dto';

/**
 * 停车场控制器
 * 
 * 处理停车场相关的HTTP请求
 */
@Controller('parking')
export class ParkingController {
  constructor(private parkingService: ParkingService) {}

  /**
   * 获取所有停车场
   * 
   * @returns 所有停车场列表
   */
  @Get()
  async findAllParkingLots() {
    return this.parkingService.findAllParkingLots();
  }

  /**
   * 搜索停车场
   * 
   * @param query 搜索关键词
   * @param req 请求对象，包含用户信息
   * @returns 匹配的停车场列表
   */
  @UseGuards(JwtAuthGuard)
  @Get('search')
  async searchParkingLots(@Query('query') query: string, @Request() req) {
    // 保存搜索历史
    if (query) {
      await this.parkingService.saveSearchHistory(req.user.id, query);
    }
    
    return this.parkingService.searchParkingLots(query);
  }

  /**
   * 获取附近的停车场
   * 
   * @param latitude 纬度
   * @param longitude 经度
   * @returns 附近的停车场列表
   */
  @Get('nearby')
  async findNearbyParkingLots(
    @Query('latitude') latitude: string,
    @Query('longitude') longitude: string,
  ) {
    return this.parkingService.findNearbyParkingLots(latitude, longitude);
  }

  /**
   * 获取用户搜索历史
   * 
   * @param req 请求对象，包含用户信息
   * @returns 用户的搜索历史列表
   */
  @UseGuards(JwtAuthGuard)
  @Get('history')
  async getSearchHistory(@Request() req) {
    return this.parkingService.getUserSearchHistory(req.user.id);
  }

  /**
   * 根据ID获取停车场
   * 
   * @param id 停车场ID
   * @returns 找到的停车场
   */
  @Get(':id')
  async findParkingLotById(@Param('id') id: string) {
    return this.parkingService.findParkingLotById(+id);
  }

  /**
   * 创建新停车场
   * 
   * @param createParkingLotDto 停车场信息
   * @returns 创建的停车场
   */
  @Post()
  async createParkingLot(@Body() createParkingLotDto: CreateParkingLotDto) {
    return this.parkingService.createParkingLot(createParkingLotDto);
  }
}
