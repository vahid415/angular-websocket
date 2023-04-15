import { Socket } from 'ngx-socket-io';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { DataModel } from '../models/data-models';

@Injectable({
  providedIn: 'root',
})
export class DataStreamService {
  private readonly loading$$ = new BehaviorSubject<boolean>(false);
  readonly loading$: Observable<boolean> = this.loading$$;

  readonly list$: Observable<DataModel[]> =
    this.socket.fromEvent<DataModel[]>('list');
  constructor(private socket: Socket) {}

  findById(id: string) {
    this.socket.emit('getDoc', id);
  }
}
