import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeeesComponent } from './add-employeees.component';

describe('AddEmployeeesComponent', () => {
  let component: AddEmployeeesComponent;
  let fixture: ComponentFixture<AddEmployeeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEmployeeesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddEmployeeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
