import { Injectable } from '@angular/core';
import { Observable, Subject, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataModel } from '../models/data-models';
import { WebsocketService } from './socket.worker';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import{IWebSocket } from '../models/websocket';
const URL = 'ws://localhost:4200/ng-cli-ws';

@Injectable({
  providedIn: 'root',
})
export class DataStreamService {
  public socket$: WebSocketSubject<IWebSocket<DataModel>> = new WebSocketSubject(URL);

  constructor() {
  }

  public connect(): WebSocketSubject<any> {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = webSocket(URL);
    }
    return this.socket$;
  }

  subs (){
    return this.socket$.multiplex;
  }

  public dataUpdates$() {
    return this.connect().asObservable();
  }

  closeConnection() {
    this.connect().complete();
  }


  addData(newData: DataModel): void {
    this.socket$.next({type: 'ok', data: newData});
    debugger
    // this.connect()
  }
}
