import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Subject, Observable, filter } from 'rxjs';
import { RedisService } from '../../redis/redis.service';

@Injectable()
export class CountDownService implements OnModuleDestroy {
  constructor(private readonly redisService: RedisService) {}
  private countdownSubject = new Subject<unknown>();
  private duration = 10;

  startCountdown(): void {
    const intervalId = setInterval(async () => {
      this.duration--;
      this.countdownSubject.next(this.duration);

      if (this.duration <= 0) {
        clearInterval(intervalId);
        const result = await this.redisService.getAllRollDiceObjects();
        this.countdownSubject.next(result);
        this.duration = 10;
        this.redisService.clearGameRoundStatus();
      }
    }, 1000);
  }

  getCountdownObservable(): Observable<unknown> {
    return this.countdownSubject
      .asObservable()
      .pipe(filter((value) => value !== undefined));
  }
  onModuleDestroy() {
    this.countdownSubject.complete;
  }
}
