import { Injectable } from '@nestjs/common';
import { RollDice } from './game.interface';
import { RedisService } from '../redis/redis.service';
import { ShowResult } from '../redis/interface';
import { ServerSideUpdateService } from '../server-side-update/server-side-update.service';

@Injectable()
export class GameService {
    constructor(private readonly redisService: RedisService, private readonly updateService: ServerSideUpdateService){}
    private roll(): number {
        return Math.floor(Math.random() * 6) + 1;
    }
    private  rollSixDice(): Array<number> {
        const sum = []
        for (let i = 0; i < 6; i++) {
            sum.push (this.roll());
        }
        return  sum
    }
    private countCombinationsWithSum(sum, length) {
        const dp = Array.from({ length: length + 1 }, () => Array(sum + 1).fill(0));
    
        for (let i = 0; i <= length; i++) {
            dp[i][0] = 1;
        }
    
        for (let i = 1; i <= length; i++) {
            for (let j = 1; j <= sum; j++) {
                for (let k = 1; k <= 6 && k <= j; k++) {
                    dp[i][j] += dp[i - 1][j - k];
                }
            }
        }
    
        // The result is the sum of options for all lengths up to 'length'
        let result = 0;
        for (let i = 1; i <= length; i++) {
            result += dp[i][sum];
        }
    
        return result;
    }
    private calculateLowerNumberProbability(appearanceOutCome: number): number {
        const totalOutcomes = Math.pow(6, 6);
         return appearanceOutCome/totalOutcomes;       

    }
    public rollDice(roundNumber: number, userId: string) :RollDice{
        const currentRoll = this.rollSixDice();
        const rollSum =currentRoll.reduce((accumulator, currentValue) => accumulator + currentValue,0)
        const rollProbability= this.calculateLowerNumberProbability(
            this.countCombinationsWithSum(rollSum, 6))
         return{rollList: currentRoll, rollProbability: rollProbability,rollSum ,roundNumber:roundNumber+1, userId}            
    }
    public async checkIfRoundEnd():Promise<ShowResult>{
          const gameStatus = await this.redisService.gameStatus();
          if(!gameStatus){
            return null
          }
        return gameStatus 
    }
    public async checkIfRoundEndAndUserExists (userId:string):Promise<boolean>{
        const isRoundEnded = await this.checkIfRoundEnd()
        if(!isRoundEnded){
            return false
        }       
         const userDoseNotExists = await this.redisService.checkIfDoseNotIdeExists(isRoundEnded.activeUser, userId);
         if(!userDoseNotExists){
            return true
         }
        return false 
         
    }
    public async checkUserHaveMoreRound(userId):Promise<boolean> {
        const userRound  = await this.redisService.getUserRound(userId)
        if(parseInt(userRound) >=10){
        return false
        }
        return true
    } 
    public async playRound(userId:string):Promise<RollDice>{
          const isUserExist = await this.checkIfRoundEndAndUserExists(userId);
          if(isUserExist){
            throw  new Error("user already played for this round!")
          }
          const currentRound =  await this.redisService.getUserRound(userId)
          const round = this.rollDice(parseInt(currentRound), userId)
          await this.redisService.setUserRound(userId, round.roundNumber)
          await this.redisService.setRoundRoll(userId,round)
            
        return round

    }
    public async skipUserRound(userId:string):Promise<void> {
           await this.redisService.endRounds(userId)
    }
    public async resetRound(userId:string):Promise<void>{
        await this.redisService.setUserRound(userId, 0)
        await this.redisService.clearUserRound(userId)
    }
    public async logoutUser(userId:string):Promise<void>{
        await this.redisService.clearUserRound(userId)
    }
    public async setUserRound(userId:string):Promise<void>{
        await this.redisService.setUserRound(userId.toString(), 0);
    }
    public async finesUserRound(userId:string):Promise<boolean>{
      return  await this.redisService.finesRound(userId);
    }
    public async endRoundUser(userId:string):Promise<void>{
    await this.redisService.endRounds(userId)
    }
}
