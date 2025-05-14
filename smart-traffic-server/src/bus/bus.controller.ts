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
import { BusService } from './bus.service';
import { CreateBusRouteDto } from './dto/create-bus-route.dto';

/**
 * 公交控制器
 * 
 * 处理公交路线相关的HTTP请求
 */
@Controller('bus')
export class BusController {
  constructor(private busService: BusService) {}

  /**
   * 获取所有公交路线
   * 
   * @returns 所有公交路线列表
   */
  @Get()
  async findAllRoutes() {
    return this.busService.findAllRoutes();
  }

  /**
   * 搜索公交路线
   * 
   * @param query 搜索关键词
   * @param req 请求对象，包含用户信息
   * @returns 匹配的公交路线列表
   */
  @UseGuards(JwtAuthGuard)
  @Get('search')
  async searchRoutes(@Query('query') query: string, @Request() req) {
    // 保存搜索历史
    if (query) {
      await this.busService.saveSearchHistory(req.user.id, query);
    }
    
    return this.busService.searchRoutes(query);
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
    return this.busService.getUserSearchHistory(req.user.id);
  }

  /**
   * 根据ID获取公交路线
   * 
   * @param id 公交路线ID
   * @returns 找到的公交路线
   */
  @Get(':id')
  async findRouteById(@Param('id') id: string) {
    return this.busService.findRouteById(+id);
  }

  /**
   * 创建新公交路线
   * 
   * @param createBusRouteDto 公交路线信息
   * @returns 创建的公交路线
   */
  @Post()
  async createRoute(@Body() createBusRouteDto: CreateBusRouteDto) {
    return this.busService.createRoute(createBusRouteDto);
  }
}
