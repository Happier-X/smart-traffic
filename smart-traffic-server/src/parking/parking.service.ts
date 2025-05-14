import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateParkingLotDto } from './dto/create-parking-lot.dto';

/**
 * 停车场服务
 * 
 * 提供停车场相关功能
 */
@Injectable()
export class ParkingService {
  constructor(private prisma: PrismaService) {}

  /**
   * 创建新停车场
   * 
   * @param createParkingLotDto 停车场信息
   * @returns 创建的停车场
   */
  async createParkingLot(createParkingLotDto: CreateParkingLotDto) {
    return this.prisma.parkingLot.create({
      data: {
        name: createParkingLotDto.name,
        address: createParkingLotDto.address,
        latitude: createParkingLotDto.latitude,
        longitude: createParkingLotDto.longitude,
        totalSpaces: createParkingLotDto.totalSpaces,
        availableSpaces: createParkingLotDto.availableSpaces,
        price: createParkingLotDto.price.toString(),
        status: createParkingLotDto.status,
      },
    });
  }

  /**
   * 获取所有停车场
   * 
   * @returns 所有停车场列表
   */
  async findAllParkingLots() {
    return this.prisma.parkingLot.findMany();
  }

  /**
   * 根据关键词搜索停车场
   * 
   * @param query 搜索关键词
   * @returns 匹配的停车场列表
   */
  async searchParkingLots(query: string) {
    return this.prisma.parkingLot.findMany({
      where: {
        OR: [
          { name: { contains: query } },
          { address: { contains: query } },
        ],
      },
    });
  }

  /**
   * 根据ID获取停车场
   * 
   * @param id 停车场ID
   * @returns 找到的停车场
   */
  async findParkingLotById(id: number) {
    return this.prisma.parkingLot.findUnique({
      where: { id },
    });
  }

  /**
   * 根据经纬度获取附近的停车场
   * 
   * @param latitude 纬度
   * @param longitude 经度
   * @returns 附近的停车场列表
   */
  async findNearbyParkingLots(latitude: string, longitude: string) {
    // 这里简化处理，实际应该使用地理位置计算
    const parkingLots = await this.prisma.parkingLot.findMany();
    
    // 为每个停车场添加距离信息
    // 注意：这只是一个简化的距离计算，实际应使用更精确的算法
    return parkingLots.map(lot => {
      const distance = this.calculateDistance(
        parseFloat(latitude),
        parseFloat(longitude),
        parseFloat(lot.latitude),
        parseFloat(lot.longitude)
      );
      
      return {
        ...lot,
        distance: `${distance.toFixed(1)}km`
      };
    }).sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
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
        type: 'parking',
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
        type: 'parking',
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
    });
  }

  /**
   * 计算两个地理坐标之间的距离（使用简化的欧几里得距离）
   * 
   * @param lat1 起始点纬度
   * @param lon1 起始点经度
   * @param lat2 终点纬度
   * @param lon2 终点经度
   * @returns 距离（公里）
   */
  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    // 简化距离计算，实际应使用Haversine公式
    const R = 6371; // 地球半径（公里）
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // 距离（公里）
    return distance;
  }

  /**
   * 将角度转换为弧度
   * 
   * @param deg 角度
   * @returns 弧度
   */
  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}
