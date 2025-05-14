import { IsNotEmpty, IsString, IsDecimal, IsOptional } from 'class-validator';

/**
 * 创建公交路线DTO
 * 
 * 用于创建新公交路线时的数据验证
 */
export class CreateBusRouteDto {
  @IsNotEmpty({ message: '公交线路号不能为空' })
  @IsString({ message: '公交线路号必须是字符串' })
  number: string;

  @IsNotEmpty({ message: '起始站点不能为空' })
  @IsString({ message: '起始站点必须是字符串' })
  startStation: string;

  @IsNotEmpty({ message: '终点站不能为空' })
  @IsString({ message: '终点站必须是字符串' })
  endStation: string;

  @IsNotEmpty({ message: '运营开始时间不能为空' })
  @IsString({ message: '运营开始时间必须是字符串' })
  startTime: string;

  @IsNotEmpty({ message: '运营结束时间不能为空' })
  @IsString({ message: '运营结束时间必须是字符串' })
  endTime: string;

  @IsNotEmpty({ message: '票价不能为空' })
  @IsDecimal({}, { message: '票价必须是有效的十进制数字' })
  price: number;
}
