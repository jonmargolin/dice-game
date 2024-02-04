import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisRepository } from './repository/redis.repository';
import { redisClientFactory } from './redis.client.factory';

@Module({
  imports: [],
  controllers: [],
  providers: [redisClientFactory, RedisRepository, RedisService],
  exports: [RedisService],
})
export class RedisModuleWarper {}
