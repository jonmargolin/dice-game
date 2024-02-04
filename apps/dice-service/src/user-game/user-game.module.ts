import { Module } from '@nestjs/common';
import { UserGameResolver } from './user-game.resolver';
import { RedisModuleWarper } from '../redis/redis.module';
import { GameService } from './game.service';
import { ServerSideUpdateModule } from '../server-side-update/server-side-update.module';

@Module({
  imports: [RedisModuleWarper, ServerSideUpdateModule],
  providers: [UserGameResolver, GameService],
})
export class UserGameModule {}
