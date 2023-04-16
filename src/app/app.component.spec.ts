import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { InputsComponent } from './inputs/inputs.component';
import { DataStreamService } from './services/data-stream.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, TableComponent, InputsComponent],
      declarations: [AppComponent],
      providers: [
        {
          provide: DataStreamService,
          useValue: {},
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'B2Broker'`, () => {
    expect(component.title).toEqual('B2Broker');
  });

  it('should render table', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.table-header')).toBeTruthy();
    expect(compiled.querySelector('.table-content')).toBeTruthy();
  });
});
