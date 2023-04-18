import {of} from "rxjs";
import {TestBed} from '@angular/core/testing';
import {Socket, SocketIoConfig} from "ngx-socket-io";
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import {DataStreamService} from "./data-stream.service";

const config: SocketIoConfig = {url: 'http://localhost:4200', options: {}};

describe('DataStreamService', () => {
  let service: DataStreamService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{
        provide: DataStreamService,
        useValue: {list$: of({id: 1, color: 'red'}), loading$$: of(true)},
      },
        {
          provide: Socket,
          useValue: {connect: {}},
        }],
    });
    service = TestBed.inject(DataStreamService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getValue should return real value from the real service', () => {
    service = new DataStreamService(new Socket(config));
    let gottenValue: Array<any> | undefined;
    service.list$.subscribe({
      next: data => {
        gottenValue = data;
      },
      error: () => {
        gottenValue = undefined;
      },
    });

    expect(service.loading$$.subscribe()).toBeTruthy();
    expect(gottenValue).toEqual([]);
  });
});
