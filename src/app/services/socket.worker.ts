import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { DataModel } from '../models/data-models';

const URL = 'ws://localhost:4200/ng-cli-ws';
@Injectable({ providedIn: 'root' })
export class WebsocketService {
  // set ws protocol when using http and wss when using https
  protocol = window.location.protocol.replace('http', 'ws');
  // get location host
  host = window.location.host;
  // websocket instantiation
//   `${this.protocol}//${this.host}/stream`
  private socket$: WebSocketSubject<any> = new WebSocketSubject(URL);
  // ws://localhost:4200/ng-cli-ws
  constructor() {}

  public connect(): WebSocketSubject<any> {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = webSocket(URL);
    }
    return this.socket$;
  }

  public dataUpdates$() {
    this.socket$;
    return this.connect().asObservable();
  }

  closeConnection() {
    this.connect().complete();
  }

  sendMessage(msg: DataModel) {
    this.socket$.next(msg);
  }
}
