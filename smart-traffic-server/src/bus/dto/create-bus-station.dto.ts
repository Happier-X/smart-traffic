import { IsNotEmpty, IsString, IsNumber, IsInt } from 'class-validator';

/**
 * 创建公交站点DTO
 */
export class CreateBusStationDto {
  /**
   * 站点名称
   */
  @IsNotEmpty({ message: '站点名称不能为空' })
  @IsString({ message: '站点名称必须是字符串' })
  name: string;
  
  /**
   * 纬度
   */
  @IsNotEmpty({ message: '纬度不能为空' })
  @IsString({ message: '纬度必须是字符串' })
  latitude: string;
  
  /**
   * 经度
   */
  @IsNotEmpty({ message: '经度不能为空' })
  @IsString({ message: '经度必须是字符串' })
  longitude: string;
  
  /**
   * 站点顺序
   */
  @IsNotEmpty({ message: '站点顺序不能为空' })
  @IsInt({ message: '站点顺序必须是整数' })
  order: number;
  
  /**
   * 所属路线ID
   */
  @IsNotEmpty({ message: '路线ID不能为空' })
  @IsInt({ message: '路线ID必须是整数' })
  routeId: number;
}
