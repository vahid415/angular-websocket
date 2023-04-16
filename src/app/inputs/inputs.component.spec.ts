import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputsComponent } from './inputs.component';
import { DataStreamService } from '../services/data-stream.service';

describe('InputsComponent', () => {
  let component: InputsComponent;
  let fixture: ComponentFixture<InputsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: DataStreamService,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
