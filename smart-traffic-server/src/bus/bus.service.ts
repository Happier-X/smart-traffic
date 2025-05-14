import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBusRouteDto } from './dto/create-bus-route.dto';

/**
 * 公交服务
 * 
 * 提供公交路线相关功能
 */
@Injectable()
export class BusService {
  constructor(private prisma: PrismaService) {}

  /**
   * 创建新公交路线
   * 
   * @param createBusRouteDto 公交路线信息
   * @returns 创建的公交路线
   */
  async createRoute(createBusRouteDto: CreateBusRouteDto) {
    return this.prisma.busRoute.create({
      data: {
        number: createBusRouteDto.number,
        startStation: createBusRouteDto.startStation,
        endStation: createBusRouteDto.endStation,
        startTime: createBusRouteDto.startTime,
        endTime: createBusRouteDto.endTime,
        price: createBusRouteDto.price.toString(),
      },
    });
  }

  /**
   * 获取所有公交路线
   * 
   * @returns 所有公交路线列表
   */
  async findAllRoutes() {
    return this.prisma.busRoute.findMany({
      include: {
        stations: {
          orderBy: {
            order: 'asc',
          },
        },
      },
    });
  }

  /**
   * 根据公交线路号搜索路线
   * 
   * @param query 搜索关键词
   * @returns 匹配的公交路线列表
   */
  async searchRoutes(query: string) {
    return this.prisma.busRoute.findMany({
      where: {
        OR: [
          { number: { contains: query } },
          { startStation: { contains: query } },
          { endStation: { contains: query } },
        ],
      },
      include: {
        stations: {
          orderBy: {
            order: 'asc',
          },
        },
      },
    });
  }

  /**
   * 根据ID获取公交路线
   * 
   * @param id 公交路线ID
   * @returns 找到的公交路线
   */
  async findRouteById(id: number) {
    return this.prisma.busRoute.findUnique({
      where: { id },
      include: {
        stations: {
          orderBy: {
            order: 'asc',
          },
        },
      },
    });
  }

  /**
   * 为用户保存搜索历史
   * 
   * @param userId 用户ID
   * @param query 搜索关键词
   */
  async saveSearchHistory(userId: number, query: string) {
    return this.prisma.searchHistory.create({
      data: {
        userId,
        query,
        type: 'bus',
      },
    });
  }

  /**
   * 获取用户的搜索历史
   * 
   * @param userId 用户ID
   * @param limit 限制数量
   * @returns 用户的搜索历史列表
   */
  async getUserSearchHistory(userId: number, limit = 10) {
    return this.prisma.searchHistory.findMany({
      where: {
        userId,
        type: 'bus',
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
    });
  }
}
