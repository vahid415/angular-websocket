import { Socket } from 'ngx-socket-io';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, map } from 'rxjs';

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
  private readonly list$$: Subscription= this.socket
    .fromEvent<DataModel[]>('list')
    .pipe(
      map((serverData) => {
        const start = (this.pageNumber + 1) * 10;
        const end = Math.min(start + this.pageSize$.value, serverData.length);
        this.list$.next(serverData.slice(start, end));
        this.pageNumber = this.pageNumber + 1;
        return this.list$;
      })
    ).subscribe();
  constructor(private socket: Socket) {}

  findById(id: string) {
    this.socket.emit('getDoc', id);
  }

  setTimer(time: number) {
    this.pageNumber = 0;
     this.timer$.next(time);
     this.socket.emit('list');
  }

  setPageSize(size: number) {
    this.pageNumber = 0;
    this.pageSize$.next(size);
    this.socket.emit('list');
 }


  getNextPage() {
    this.loading$.next(true);
    setTimeout(() => {
      this.socket.emit('list');
      this.loading$.next(false);
    }, this.timer$.value);
  }

  getPrevPage() {
    this.socket.emit('prev');
  }
}
