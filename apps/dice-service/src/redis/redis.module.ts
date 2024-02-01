// import { Module, Global } from '@nestjs/common';
// import { RedisModule, RedisModuleOptions } from 'nestjs-redis';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { RedisService } from './redis.service';

// @Global()
// @Module({
//   imports: [
//     ConfigModule,
//     RedisModule.forRootAsync({
//       useFactory: async (configService: ConfigService): Promise<RedisModuleOptions> => ({
//         url: `redis://${configService.get<string>('REDIS_HOST') || 'localhost'}:${
//           configService.get<number>('REDIS_PORT') || 6379
//         }`,
//       }),
//       inject: [ConfigService],
//     }),
//   ],
//   providers:[RedisService],
//   exports: [RedisModule],
// })
// export class RedisModuleConfig {}
import { Module } from '@nestjs/common';
import { redisClientFactory } from './redis.client.factory';
import { RedisService } from './redis.service';
import { RedisRepository } from './repository/redis.repository';

@Module({
    imports: [],
    controllers: [],
    providers: [redisClientFactory, RedisRepository, RedisService],
    exports: [RedisService],
})
export class RedisModule {}