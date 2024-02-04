import { FactoryProvider, Logger } from '@nestjs/common';
import { Redis } from 'ioredis';

export const redisClientFactory: FactoryProvider<Redis> = {
    provide: 'RedisClient',
    useFactory: () => {
        console.log(process.env.REDIS_HOST,parseInt(process.env.REDIS_PORT))
        console.log("start")
        try {
        const redisInstance = new Redis({
            host: process.env.REDIS_HOST || 'redis-server',
            port: 6379,
        })
        redisInstance?.on('error', (error) => {
            Logger.error(`Redis connection failed: ${error}`, 'RedisModule', false);
         
        });

        redisInstance?.on('connect', () => {
            Logger.log('Connected to Redis', 'RedisModule',);
        });
    
        // redisInstance.on('error', e => {
        //     throw new Error(`Redis connection failed: ${e}`);
        // });

        return redisInstance;
    }
    catch (error) {
        console.error(error)
    }
    },
    inject: [],
};