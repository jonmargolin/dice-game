import { Inject, Injectable } from '@nestjs/common';
import { RedisRepository } from './repository/redis.repository';
import { RollDice } from '../user-game/game.interface';
import {ShowResult } from './interface';
import { Logger } from '@nestjs/common';

@Injectable()
export class RedisService {
   private allRollDiceSetKey = 'rollDice:allRollIds';
   private allUserKey = 'allUserIds:allRollIds';
   private showResultKey = 'showResult';
    constructor(@Inject(RedisRepository) private readonly redisRepository: RedisRepository) {
    
    }
 
  
    async setUserRound(userId: string, round: number): Promise<void> {
      const values = {userId, round}
      this.redisRepository.hmset( userId, values)
      this.redisRepository.sadd(this.allUserKey, userId)
    }
    async getUserRound(userId: string):Promise<string>{
  return await this.redisRepository.hget(userId,'round' )
    }
    async setRoundRoll(userId: string, rollDice: RollDice): Promise<void> {
      const hashKey = `rollDice:userId:${userId}`;
      this.redisRepository.hmset(hashKey, rollDice);
      this.redisRepository.sadd(this.allRollDiceSetKey, userId);
      const isRoundEnd  = await this.redisRepository.exists(this.showResultKey);
      if(isRoundEnd){
        this.endRounds(userId)
      }
      
    }
    async getAllRollDiceObjects(): Promise<RollDice[]> {
      // Retrieve all rollIds from the set
      const allRollIds = await this.redisRepository.smembers(this.allRollDiceSetKey);
      const multi = this.redisRepository.getClient()
     
    
    allRollIds.forEach(userId => {
      multi.hgetall(`rollDice:userId:${userId}`);
    });
    return await (await multi.exec()).flat().filter(item => item !== null) as RollDice []
    }

    async isGameExists():Promise<boolean>{
      return Boolean (await this.redisRepository.exists(this.showResultKey));
   }
    public checkIfDoseNotIdeExists(userList: string[], userId: string): boolean{
     const userNotFound = userList.find((item) => item === userId)
        if(userNotFound){
          return false
        }
        return true
    }
    async endRounds(userId: string): Promise<void>{
      const showResultExists = await this.isGameExists()
  if(!showResultExists){
    return
  }
     const data = await this.redisRepository.hget(this.showResultKey, "data");
     const showResultData = JSON.parse(data);
   const isUserNotfound = this.checkIfDoseNotIdeExists(showResultData.activeUser, userId) 
     if(isUserNotfound){
      showResultData.activeUser.push(userId);
      await this.redisRepository.hset(this.showResultKey,'data', showResultData )
     }   
    }
   async finesRound(userId: string): Promise<boolean>{
     const isGameEnded = await this.isGameExists();
     if(isGameEnded){
     return isGameEnded
     }
     const allRollIds = await this.redisRepository.smembers(this.allRollDiceSetKey);
     const showResult = {
       userCount: allRollIds.length,
       activeUser: [userId] ,
     };
     this.redisRepository.hset(this.showResultKey, "data", showResult);
     return isGameEnded

   }
   async clearGameRoundStatus(): Promise<void>{
   Logger.log('clearGameRoundStatus');
   await this.redisRepository.clearAll(this.showResultKey)

   }
    async gameStatus(): Promise<ShowResult> {
      const showResultExists = await this.isGameExists()
        if(showResultExists){
     const result =  await this.redisRepository.hget(this.showResultKey, "data")
     const data =JSON.parse(result) 
      return new ShowResult(data.userCount, data.activeUser)
        }
       return  null
    }
    async clearUserRound(userId:string): Promise<void>{
      const hashKey = `rollDice:userId:${userId}`;
      await this.redisRepository.clearAll(hashKey);
      try{
      await this.redisRepository.removeItemFromSet(this.allUserKey, userId);
      }
      catch(err){
        Logger.error(err)
      }
    }
}
