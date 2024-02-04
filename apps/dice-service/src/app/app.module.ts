import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { RedisModuleWarper } from '../redis/redis.module';
import { UserGameModule } from '../user-game/user-game.module';
import { ServerSideUpdateModule } from '../server-side-update/server-side-update.module';





@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
    autoSchemaFile: true,
    driver: ApolloDriver,
    context: ({ req, res }) => ({ req, res }),
  }),
  RedisModuleWarper,
  UserGameModule,
  ServerSideUpdateModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

