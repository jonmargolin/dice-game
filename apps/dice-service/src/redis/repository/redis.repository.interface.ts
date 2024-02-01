export interface RedisRepositoryInterface {
    get(prefix: string, key: string): Promise<string | null>;
    set(prefix: string, key: string, value: string): Promise<void>;
    delete(prefix: string, key: string): Promise<void>;
    setWithExpiry(prefix: string, key: string, value: string, expiry: number): Promise<void>;
    hmset(hash: string,value: Record<string, unknown>): Promise<void>;
    hget?(hash: string, value: string): Promise<string | null>;
    sadd?(key: string, value: string): Promise<void>;
    smembers?(setKey: string)
    multi?(keys: string[]): Promise<unknown[]>
    exists?(key:string):Promise<number>
    hgetall?(key:string): Promise<unknown>
    hset?(hashKey: string, field: string, value: unknown):Promise<unknown>;
}