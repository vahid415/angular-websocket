import {ComponentFixture, TestBed} from '@angular/core/testing';
import  * as testHelper from 'test';

import {ChildTableComponent} from './child-table.component';

describe('ChildTableComponent', () => {
  let component: ChildTableComponent;
  let fixture: ComponentFixture<ChildTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({}).compileComponents();

    fixture = TestBed.createComponent(ChildTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should set column data', () => {
   testHelper.setInput(fixture, 'data', {id: '1', color: 'red'});
    const ColorEl = testHelper.findEl(fixture, 'color-col');
    const idEl = testHelper.findEl(fixture, 'id-col');
    expect(ColorEl.nativeElement.textContent).toBe('red');
    expect(idEl.nativeElement.textContent).toBe('1');
  })
});
