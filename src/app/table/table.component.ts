import { Component } from '@angular/core';

import { DataStreamService } from '../services/data-stream.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  readonly list$ = this.service.list$;
  readonly loading$ = this.service.loading$;

  constructor(private service: DataStreamService) {}

  getItem(id: string) {
    this.service.findById(id);
  }
}
