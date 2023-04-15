import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { DataModel } from 'src/app/models/data-models';
import { DataStreamService } from 'src/app/services/data-stream-service';

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.scss']
})
export class InputsComponent implements OnInit, OnDestroy {
  dataSize: number = 100;
  timerInterval: number = 1000; // default timer interval in ms
  dataLength: number = 10; // default data length
  data: DataModel[] = [];
private dataSubscription: Subscription = new Subscription;

  constructor(private dataStreamService: DataStreamService) { }

  ngOnInit(): void {
    const worker = new Worker('./worker', { type: 'module' });
    worker.onmessage = ({ data }) => {
      // Limit data size to 10
      this.data = [...data.slice(-10)];
    };
    worker.postMessage('start');
    this.getData();
  }

  getData(): void {
  }

  onIntervalChange(): void {
    this.getData();
  }
  
  restartSocket() {
    console.log('0');
    
    // restart the socket with the new data size
  }

  ngOnDestroy() {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }
}
