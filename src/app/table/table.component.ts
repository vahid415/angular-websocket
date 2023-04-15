import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataModel } from '../models/data-models';

import { DataStreamService } from '../services/data-stream.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  readonly list$ = this.documentService.list$;
  readonly loading$ = this.documentService.loading$;

  constructor(private documentService: DataStreamService) {
  }

  loadDoc(id: string) {
    this.documentService.getDocument(id);
  }
}
