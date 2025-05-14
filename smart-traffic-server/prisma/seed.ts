import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

/**
 * 填充示例数据到数据库
 */
async function seed() {
  console.log('开始填充示例数据...');

  // 清空现有数据
  await prisma.searchHistory.deleteMany();
  await prisma.busStation.deleteMany();
  await prisma.busRoute.deleteMany();
  await prisma.parkingLot.deleteMany();
  await prisma.user.deleteMany();

  console.log('现有数据已清空');

  // 创建示例用户
  const hashedPassword = await bcrypt.hash('123456', 10);
  const user = await prisma.user.create({
    data: {
      username: 'test',
      password: hashedPassword,
    },
  });

  console.log(`创建示例用户: ${user.username}`);

  // 创建公交路线
  const busRoutes = await Promise.all([
    prisma.busRoute.create({
      data: {
        number: '1路',
        startStation: '火车站',
        endStation: '曲师大',
        startTime: '06:00',
        endTime: '22:00',
        price: '2.00',
      },
    }),
    prisma.busRoute.create({
      data: {
        number: '2路',
        startStation: '曲师大',
        endStation: '高铁站',
        startTime: '05:30',
        endTime: '23:00',
        price: '2.00',
      },
    }),
    prisma.busRoute.create({
      data: {
        number: '3路',
        startStation: '高铁站',
        endStation: '市政府',
        startTime: '06:30',
        endTime: '22:30',
        price: '2.50',
      },
    }),
  ]);

  console.log(`创建${busRoutes.length}条公交路线`);

  // 为每条路线创建站点
  for (const route of busRoutes) {
    const stationsData = [];
    let startLat, startLong, endLat, endLong;

    if (route.number === '1路') {
      startLat = '35.58';
      startLong = '116.92';
      endLat = '35.60';
      endLong = '116.97';
    } else if (route.number === '2路') {
      startLat = '35.60';
      startLong = '116.97';
      endLat = '35.62';
      endLong = '116.95';
    } else {
      startLat = '35.62';
      startLong = '116.95';
      endLat = '35.59';
      endLong = '116.93';
    }

    // 创建起始站
    await prisma.busStation.create({
      data: {
        name: route.startStation,
        latitude: startLat,
        longitude: startLong,
        order: 1,
        routeId: route.id,
      },
    });
    stationsData.push(route.startStation);

    // 创建2-3个中间站
    for (let i = 1; i <= 3; i++) {
      // 简单线性插值计算中间站位置
      const progress = i / 4; // 0.25, 0.5, 0.75
      const lat = parseFloat(startLat) + (parseFloat(endLat) - parseFloat(startLat)) * progress;
      const long = parseFloat(startLong) + (parseFloat(endLong) - parseFloat(startLong)) * progress;
      
      await prisma.busStation.create({
        data: {
          name: `${route.number}中间站${i}`,
          latitude: lat.toString(),
          longitude: long.toString(),
          order: i + 1,
          routeId: route.id,
        },
      });
      stationsData.push(`${route.number}中间站${i}`);
    }

    // 创建终点站
    await prisma.busStation.create({
      data: {
        name: route.endStation,
        latitude: endLat,
        longitude: endLong,
        order: 5,
        routeId: route.id,
      },
    });
    stationsData.push(route.endStation);

    console.log(`为路线 ${route.number} 创建了 ${stationsData.length} 个站点: ${stationsData.join(', ')}`);
  }

  // 创建停车场
  const parkingLots = await Promise.all([
    prisma.parkingLot.create({
      data: {
        name: '火车站停车场',
        address: '火车站北广场',
        latitude: '35.58',
        longitude: '116.92',
        totalSpaces: 120,
        availableSpaces: 45,
        price: '5.00',
        status: '空闲',
      },
    }),
    prisma.parkingLot.create({
      data: {
        name: '市中心停车场',
        address: '市中心商业区地下',
        latitude: '35.59',
        longitude: '116.94',
        totalSpaces: 200,
        availableSpaces: 32,
        price: '6.00',
        status: '适中',
      },
    }),
    prisma.parkingLot.create({
      data: {
        name: '商业街停车场',
        address: '步行街北门入口处',
        latitude: '35.61',
        longitude: '116.96',
        totalSpaces: 80,
        availableSpaces: 5,
        price: '8.00',
        status: '拥挤',
      },
    }),
    prisma.parkingLot.create({
      data: {
        name: '曲师大停车场',
        address: '曲师大南门对面',
        latitude: '35.60',
        longitude: '116.97',
        totalSpaces: 100,
        availableSpaces: 60,
        price: '3.00',
        status: '空闲',
      },
    }),
  ]);

  console.log(`创建了 ${parkingLots.length} 个停车场`);

  // 创建搜索历史
  const searchHistories = await Promise.all([
    prisma.searchHistory.create({
      data: {
        userId: user.id,
        query: '1路',
        type: 'bus',
      },
    }),
    prisma.searchHistory.create({
      data: {
        userId: user.id,
        query: '火车站',
        type: 'bus',
      },
    }),
    prisma.searchHistory.create({
      data: {
        userId: user.id,
        query: '停车场',
        type: 'parking',
      },
    }),
  ]);

  console.log(`创建了 ${searchHistories.length} 条搜索历史`);

  console.log('示例数据填充完成！');
}

seed()
  .catch((e) => {
    console.error('示例数据填充失败:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

  // 创建停车场
  const parkingLots = await Promise.all([
    prisma.parkingLot.create({
      data: {
        name: '火车站停车场',
        address: '火车站北广场',
        latitude: '35.58',
        longitude: '116.92',
        totalSpaces: 120,
        availableSpaces: 45,
        price: '5.00',
        status: '空闲',
      },
    }),
    prisma.parkingLot.create({
      data: {
        name: '市中心停车场',
        address: '市中心商业区地下',
        latitude: '35.59',
        longitude: '116.94',
        totalSpaces: 200,
        availableSpaces: 32,
        price: '6.00',
        status: '适中',
      },
    }),
    prisma.parkingLot.create({
      data: {
        name: '商业街停车场',
        address: '步行街北门入口处',
        latitude: '35.61',
        longitude: '116.96',
        totalSpaces: 80,
        availableSpaces: 5,
        price: '8.00',
        status: '拥挤',
      },
    }),
    prisma.parkingLot.create({
      data: {
        name: '曲师大停车场',
        address: '曲师大南门对面',
        latitude: '35.60',
        longitude: '116.97',
        totalSpaces: 100,
        availableSpaces: 60,
        price: '3.00',
        status: '空闲',
      },
    }),
  ]);

  console.log(`创建了 ${parkingLots.length} 个停车场`);

  // 创建搜索历史
  const searchHistories = await Promise.all([
    prisma.searchHistory.create({
      data: {
        userId: user.id,
        query: '1路',
        type: 'bus',
      },
    }),
    prisma.searchHistory.create({
      data: {
        userId: user.id,
        query: '火车站',
        type: 'bus',
      },
    }),
    prisma.searchHistory.create({
      data: {
        userId: user.id,
        query: '停车场',
        type: 'parking',
      },
    }),
  ]);

  console.log(`创建了 ${searchHistories.length} 条搜索历史`);

  console.log('示例数据填充完成！');
}

seed()
  .catch((e) => {
    console.error('示例数据填充失败:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
