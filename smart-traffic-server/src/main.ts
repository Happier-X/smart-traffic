import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // 获取配置服务
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3003);
  
  // 配置全局验证管道
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 自动去除未定义的属性
      transform: true, // 自动转换类型
      forbidNonWhitelisted: true, // 禁止非白名单属性
    }),
  );
  
  // 配置跨域支持
  app.enableCors({
    origin: '*', // 允许所有来源，实际生产环境应限制
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  
  // 配置全局前缀
  app.setGlobalPrefix('api');
  
  await app.listen(port);
  console.log(`服务器已启动，监听端口: ${port}`);
}
bootstrap();
