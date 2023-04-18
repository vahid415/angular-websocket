import { Socket } from 'ngx-socket-io';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, interval, map } from 'rxjs';

import { DataModel } from '../models/data-models';

@Injectable({
  providedIn: 'root',
})
export class DataStreamService {
  private readonly loading$ = new BehaviorSubject<boolean>(false);
  readonly loading$$: Observable<boolean> = this.loading$.asObservable();
  private pageNumber = 0;
  private readonly timer$ = new BehaviorSubject<number>(1000);
  readonly timer$$: Observable<number> = this.timer$.asObservable();
  private readonly pageSize$ = new BehaviorSubject<number>(10);
  readonly pageSize$$: Observable<number> = this.timer$.asObservable();

  readonly list$ = new BehaviorSubject<DataModel[]>([]);
  private interval$: Subscription | undefined;
  private readonly list$$: Subscription = this.socket
    .fromEvent<DataModel[]>('list')
    .pipe(
      map((serverData) => {
        const start = this.pageNumber * 10;
        const end = Math.min(start + this.pageSize$.value, serverData.length);
        const list = serverData.slice(start, end);
        if (list.length) {
          this.list$.next(list);
        } else {
          this.clearInterval();
        }
        this.pageNumber = this.pageNumber + 1;
      })
    )
    .subscribe();
  constructor(private socket: Socket) {}

  findById(id: string) {
    this.socket.emit('getDoc', id);
  }

  setPageSize(size: number) {
    this.pageNumber = 0;
    this.pageSize$.next(size);
    this.socket.emit('list');
  }

  clearInterval() {
    this.pageNumber = 0;
    this.interval$?.unsubscribe();
  }
  getList(timeInterval: number) {
    this.loading$.next(true);
    this.interval$ = interval(timeInterval)
      .pipe(map(() => this.socket.emit('list')))
      .subscribe(() => this.loading$.next(false));
  }
}
