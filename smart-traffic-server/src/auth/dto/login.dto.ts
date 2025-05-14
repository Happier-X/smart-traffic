import { IsNotEmpty, IsString } from 'class-validator';

/**
 * 登录DTO
 * 
 * 用于用户登录时的数据验证
 */
export class LoginDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString({ message: '用户名必须是字符串' })
  username: string;

  @IsNotEmpty({ message: '密码不能为空' })
  @IsString({ message: '密码必须是字符串' })
  password: string;
}
