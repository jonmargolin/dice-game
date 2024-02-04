import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class ServerSideUpdateService implements OnModuleDestroy {
  private updatesSubject = new Subject<string>();

  sendUpdate(update: string): void {
    this.updatesSubject.next(update);
  }

  getUpdatesObservable(): Observable<string> {
    return this.updatesSubject.asObservable();
  }

  onModuleDestroy() {
    // Cleanup tasks, e.g., unsubscribe from Observables
    this.updatesSubject.complete();
  }
}
