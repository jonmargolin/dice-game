import { ObjectType, Field } from '@nestjs/graphql';

export interface RollDice {
  rollList: Array<number>;
  rollProbability: number;
  rollSum: number;
  roundNumber: number;
  userId: string
  [key: string]: unknown;
}
@ObjectType()
export  class RollResult implements RollDice{
    [key: string]: unknown;
    @Field(() => [Number])
    rollList: Array<number>;
  
    @Field(() => Number)
    rollProbability: number;
  
    @Field(() => Number)
    rollSum: number;
  
    @Field(() => Number)
    roundNumber: number;
    
    @Field(() => String)
    userId: string;

    constructor(
        rollList: Array<number>,
        rollProbability: number,
        rollSum: number,
        roundNumber: number,
        userId: string
      ) {
        this.rollList = rollList;
        this.rollProbability = rollProbability;
        this.rollSum = rollSum;
        this.roundNumber = roundNumber;
        this.userId = userId
      }
    
}