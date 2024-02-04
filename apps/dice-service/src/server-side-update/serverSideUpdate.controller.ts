import { Controller, Req, Sse } from '@nestjs/common';
import { EMPTY, Observable, map } from 'rxjs';
import { CountDownService } from './count-down/count-down.service';
import { Logger } from '@nestjs/common';

@Controller('server-side-update')
export class ServerSideUpdateController {
    constructor( private readonly countDownService: CountDownService){}
    @Sse('gameUpdates')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gameUpdates(@Req() req: any): Observable<MessageEvent> {
      Logger.log('conection');
      const  userId = req.cookies['user_dice_id'];
      if(!userId){
        this.countDownService.onModuleDestroy()
        return EMPTY
      }
      return this.countDownService.getCountdownObservable().pipe(
        map((update) => {
      return { data: { message: update } } as MessageEvent
        })
        );
    }
}
