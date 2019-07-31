import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlySalaryListComponent } from './monthly-salary-list.component';

describe('MonthlySalaryListComponent', () => {
  let component: MonthlySalaryListComponent;
  let fixture: ComponentFixture<MonthlySalaryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlySalaryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlySalaryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
