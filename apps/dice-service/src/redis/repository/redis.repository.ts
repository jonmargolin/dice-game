import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import { Redis } from 'ioredis';
import { RedisRepositoryInterface } from './redis.repository.interface';

@Injectable()
export class RedisRepository implements OnModuleDestroy, RedisRepositoryInterface {
    constructor(@Inject('RedisClient') private readonly redisClient: Redis) {
        this.redisClient = new Redis(); 
    }
    getClient()  {
        return this.redisClient.multi()
      }

    onModuleDestroy(): void {
        this.redisClient.disconnect();
    }
    async get(prefix: string, key: string): Promise<string | null> {
        return this.redisClient.get(`${prefix}:${key}`);
    }


    async set(prefix: string, key: string, value: string): Promise<void> {
        await this.redisClient.set(`${prefix}:${key}`, value);
    }
    async hset(hashKey: string, field: string, value: unknown): Promise<void> {
        await this.redisClient.hset(hashKey,field, JSON.stringify(value))
    }
    async delete(prefix: string, key: string): Promise<void> {
        await this.redisClient.del(`${prefix}:${key}`);
    }
    async clearAll(prefix:string):Promise<void>{
        await this.redisClient.del(prefix);
    }

    async setWithExpiry(prefix: string, key: string, value: string, expiry: number): Promise<void> {
        await this.redisClient.set(`${prefix}:${key}`, value, 'EX', expiry);
    }
    async  hmset(hash: string, values: Record<string, unknown>): Promise<void> {
       await this.redisClient.hmset(hash, values)
    }
     async hget(hash: string, value: string): Promise<string> {
    return this.redisClient.hget(hash, value)
    }
    async hgetall(hash:string): Promise<unknown>{
        return this.redisClient.hgetall(hash)
    }
    async sadd(key: string, value: string): Promise<void> {
         await this.redisClient.sadd(key, value)
    }
  async smembers(setKey: string) {
  return this.redisClient.smembers(setKey);
 }
 async multi(keys: string[]): Promise<unknown[]> {
    const multi = this.redisClient.multi();
    keys.forEach(key => {
      multi.hgetall(key);
    });
    return multi.exec();
 }
 async exists(key: string): Promise<number> {
     return this.redisClient.exists(key)
 }
 async removeItemFromSet(key: string, value: string): Promise<void>{
    await this.redisClient.srem(key,value);
 }
}