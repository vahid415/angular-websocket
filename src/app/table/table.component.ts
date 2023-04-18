import { ChildTableComponent } from './child-table/child-table.component';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DataStreamService } from '../services/data-stream.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  standalone: true,
  imports: [CommonModule, ChildTableComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  readonly list$ = this.service.list$;
  readonly loading$$ = this.service.loading$$;

  constructor(private service: DataStreamService) {}
}
