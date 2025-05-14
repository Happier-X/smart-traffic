import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * JWT认证守卫
 * 
 * 用于保护需要认证的路由
 */
export class JwtAuthGuard extends AuthGuard('jwt') {
  /**
   * 处理认证失败的情况
   * 
   * @param error 错误信息
   * @param host 执行上下文
   */
  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      throw err || new UnauthorizedException('未授权访问');
    }
    return user;
  }
}
