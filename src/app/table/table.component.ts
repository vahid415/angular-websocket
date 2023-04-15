import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataModel } from '../models/data-models';

import { DataStreamService } from '../services/data-stream-service';
import { DocumentService } from '../services/doc.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnDestroy {
  // data: DataModel[] = [];
  documents: Observable<string[]> | undefined;
  currentDoc: string | undefined;
  data: Array<DataModel> = [];

  private _docSub: Subscription | undefined;
  constructor( private service: DataStreamService, private documentService: DocumentService) {
  }


  ngOnInit(): void {
    // this.service.dataUpdates$().subscribe((ws) => {
    //   console.log('data', ws);
    // });

    this.documents = this.documentService.documents;
    this._docSub = this.documentService.currentDocument.subscribe(doc => this.currentDoc = doc.id);
  }

  ngOnDestroy() {
    this._docSub?.unsubscribe();
  }

  loadDoc(id: string) {
    this.documentService.getDocument(id);
  }

  newDoc() {
    this.documentService.newDocument();
  }


  updateStatus() {
    const user = {
      id: '1',
      int: 42,
      float: 3.14159,
      color: '#FF0000',
      child: {
        id: '1.1',
        color: '#00FF00',
      },
    }
      this.service.addData(user);
  }
}
