import { IsNotEmpty, IsString, IsNumber, IsDecimal, IsEnum } from 'class-validator';

// 停车场状态枚举
enum ParkingStatus {
  FREE = '空闲',
  MEDIUM = '适中',
  BUSY = '拥挤',
  FULL = '已满',
}

/**
 * 创建停车场DTO
 * 
 * 用于创建新停车场时的数据验证
 */
export class CreateParkingLotDto {
  @IsNotEmpty({ message: '停车场名称不能为空' })
  @IsString({ message: '停车场名称必须是字符串' })
  name: string;

  @IsNotEmpty({ message: '地址不能为空' })
  @IsString({ message: '地址必须是字符串' })
  address: string;

  @IsNotEmpty({ message: '纬度不能为空' })
  @IsString({ message: '纬度必须是字符串' })
  latitude: string;

  @IsNotEmpty({ message: '经度不能为空' })
  @IsString({ message: '经度必须是字符串' })
  longitude: string;

  @IsNotEmpty({ message: '总车位数不能为空' })
  @IsNumber({}, { message: '总车位数必须是数字' })
  totalSpaces: number;

  @IsNotEmpty({ message: '可用车位数不能为空' })
  @IsNumber({}, { message: '可用车位数必须是数字' })
  availableSpaces: number;

  @IsNotEmpty({ message: '价格不能为空' })
  @IsDecimal({}, { message: '价格必须是有效的十进制数字' })
  price: number;

  @IsNotEmpty({ message: '状态不能为空' })
  @IsEnum(ParkingStatus, { message: '状态必须是有效的枚举值' })
  status: ParkingStatus;
}
