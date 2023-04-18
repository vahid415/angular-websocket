import {of} from "rxjs";
import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import {TableComponent} from './table.component';
import {DataStreamService} from '../services/data-stream.service';
import * as testHelper from "../../../test";

const MockedData = [
  {
    "id": "8961",
    "int": "12345",
    "float": "61",
    "color": "blue",
    "child": {
      "id": 1.2,
      "color": "red"
    }
  }]


describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: DataStreamService,
          useValue: {list$: of(MockedData), loading$$: of(true)},
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', fakeAsync(() => {
    expect(component).toBeTruthy();
  }));

  it('should test loading', () => {
    const loadingEl = testHelper.findEl(fixture, 'loading');
    expect(loadingEl.nativeElement.className).toBe('loading');
  })

  it('should test datatable items', () => {
    const table = testHelper.findEl(fixture, 'table-body');
    expect(table.nativeElement.firstChild.textContent).toBe(MockedData[0].id);
  })

  it('should test datatable child component', () => {
    const childTable = testHelper.findEl(fixture, 'child-item');
    expect(childTable.nativeElement).toBeTruthy();
  })
});
