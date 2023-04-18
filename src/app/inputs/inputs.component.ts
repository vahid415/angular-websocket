import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
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
  timerInterval: FormControl = new FormControl(100);
  pageSize: FormControl = new FormControl(10);

  constructor(private service: DataStreamService) {}

  ngOnInit(): void {

    this.timerInterval.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(1000),
        map((num) => Number(num)),
        switchMap(()=> this.service.clearInterval()),
        tap(() => this.service.getList(this.timerInterval.value))
      )
      .subscribe();

    this.pageSize.valueChanges
      .pipe(
        distinctUntilChanged(),
        map((num) => Number(num)),
        tap((pageSize) => this.service.setPageSize(pageSize))
      )
      .subscribe();
  }

}
