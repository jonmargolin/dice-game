import { Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { v4 as uuidv4 } from 'uuid';
import { Logger } from '@nestjs/common';
import { Response, Request } from 'express';
import { GameService } from './game.service';
import {RollResult } from './game.interface';
import { CountDownService } from '../server-side-update/count-down/count-down.service';

@Resolver()
export class UserGameResolver {
    constructor(private readonly gameService: GameService, 
    private readonly countDownService: CountDownService)  {}
    @Mutation(() => Boolean)
    async startGame(@Context('res') res: Response): Promise<boolean> {
        const userId = uuidv4();
        try {
            await this.gameService.setUserRound(userId)
            Logger.log(`user start game with id ${userId}`);
            res.cookie('user_dice_id', userId, { maxAge: 900000, path: '/'});
            return true;
        } catch (error) {
            Logger.error(`${error} ${userId}`);
            throw new Error('Failed to start the game');
        }
    }
    @Query(() => RollResult)
    async rollDice(@Context('req') req: Request): Promise<unknown >{
    const  userId = req.cookies['user_dice_id'];
    if(!userId){
        return new Error("messing cookie")
    }
     const  isUserHaveRound = await this.gameService.checkUserHaveMoreRound(userId)

    if(!isUserHaveRound){
    return new Error('usr dose not  have more rounds');
    }
    try {
         const rollResult = await this.gameService.playRound(userId)
         return rollResult
    }
    catch (err) {
        Logger.error(err.message)
    return new Error('can not play');
    }
}
    @Mutation(() => Boolean)
    async endRound(@Context('req') req: Request) {
        const  userId = req.cookies['user_dice_id'];
        if(!userId){
            return new Error("messing cookie")
         }
        const isRoundEnd = this.gameService.finesUserRound(userId);
        if(!isRoundEnd){
        this.countDownService.startCountdown();
        await this.gameService.endRoundUser(userId)
        return true
        }
         return false
    }
    @Mutation(() => Boolean)
    async skipRound(@Context('req') req: Request) {
        const  userId = req.cookies['user_dice_id'];
        if(!userId){
            return new Error("messing cookie")
         }
          const  isUserHaveRound = await this.gameService.checkUserHaveMoreRound(userId)
     
         if(!isUserHaveRound){
         return new Error('usr dose not  have more rounds');
         }
         try {
            this.gameService.skipUserRound(userId);
            return true
         }
         catch (err) {
            Logger.error(err.message)
        return new Error ('can not skip round');
        }

         return true
    }
    @Mutation(() => Boolean)
    async resetGame(@Context('req') req: Request){
        const  userId = req.cookies['user_dice_id'];
        if(!userId){
            return new Error("messing cookie")
         }
         try{
            this.gameService.resetRound(userId);
          return true
         }
         catch (err) {
            Logger.error(err.message)
        return new Error('can not reset round');
         }
    }
    @Mutation(() => Boolean)
    async logOutGame(@Context('req') req: Request, @Context('res') res: Response){
        const  userId = req.cookies['user_dice_id'];
        if(!userId){
            return new Error("messing cookie")
        }
        try{
             await this.gameService.logoutUser(userId);
             res.clearCookie('user_dice_id');
             return true;
        }
        catch (err) {
            Logger.error(err.message)
        return new Error('can log out');
         }
    }


}
