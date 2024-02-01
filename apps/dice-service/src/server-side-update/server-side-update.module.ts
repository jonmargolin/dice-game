import { Module } from '@nestjs/common';
import { ServerSideUpdateController } from './serverSideUpdate.controller';
import { ServerSideUpdateService } from './server-side-update.service';
import { CountDownService } from './count-down/count-down.service';
import { RedisModule } from '../redis/redis.module';

@Module({
    imports:[RedisModule],
    controllers:[ServerSideUpdateController],
    providers:[ServerSideUpdateService, CountDownService],
    exports:[ServerSideUpdateService, CountDownService]
})
export class ServerSideUpdateModule {
}
