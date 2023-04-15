import { Injectable } from '@angular/core';

import { Socket } from 'ngx-socket-io';

import { DataModel } from '../models/data-models';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataStreamService {
  private readonly loading$$ = new BehaviorSubject<boolean>(false);
  readonly list$: Observable<DataModel[]> =
    this.socket.fromEvent<DataModel[]>('list');
  readonly loading$: Observable<boolean> = this.loading$$;
  constructor(private socket: Socket) {}

  getDocument(id: string) {
    this.socket.emit('getDoc', id);
  }
}
