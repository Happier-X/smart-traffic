import { IsNotEmpty, IsString, IsNumber, IsIn } from 'class-validator';

// 停车场状态列表
const PARKING_STATUSES = ['free', 'medium', 'busy', 'full'];

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
  price: number | string;

  @IsNotEmpty({ message: '状态不能为空' })
  @IsIn(PARKING_STATUSES, { message: '状态必须是有效值：free、medium、busy、full' })
  status: string;
}
