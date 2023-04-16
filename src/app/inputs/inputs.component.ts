import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs/operators';
import { DataStreamService } from '../services/data-stream.service';

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputsComponent implements OnInit {
  timerInterval: FormControl = new FormControl(0);
  pageSize: FormControl = new FormControl(10);
  timeInMillis: number = 0;
  interval: any;

  constructor(private service: DataStreamService) {}

  ngOnInit(): void {
    // this.timerInterval.valueChanges
    //   .pipe(
    //     distinctUntilChanged(),
    //     debounceTime(500),
    //     map((num) => Number(num)),
    //     tap((interval) => this.service.setTimer(interval))
    //   )
    //   .subscribe();

    // this.pageSize.valueChanges
    //   .pipe(
    //     distinctUntilChanged(),
    //     map((num) => Number(num)),
    //     tap((pageSize) => this.service.setPageSize(pageSize))
    //   )
    //   .subscribe();
  }

  startInterval() {
    clearInterval(this.interval);

    if (this.timeInMillis) {
      this.interval = setInterval(() => {
        this.service.setTimer(this.timeInMillis)
      }, this.timeInMillis);
      console.log('get');
      
    }
  }
}
