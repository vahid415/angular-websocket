import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InputsComponent} from './inputs.component';
import {DataStreamService} from '../services/data-stream.service';
import * as testHelper from "test";

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

  it('should test input items', () => {
    const inputELs = testHelper.findEls(fixture, 'input');
    expect(inputELs.length).toEqual(2);
    expect(inputELs[0].nativeElement.value).toEqual('100');
  })

  it('should test select option input', () => {
    const selectEL = testHelper.findEl(fixture, 'select-page-size');
    expect(selectEL.nativeElement.value).toEqual('10');
  })
});
