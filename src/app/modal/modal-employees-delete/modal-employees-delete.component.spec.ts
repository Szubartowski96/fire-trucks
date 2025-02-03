import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEmployeesDeleteComponent } from './modal-employees-delete.component';

describe('ModalEmployeesDeleteComponent', () => {
  let component: ModalEmployeesDeleteComponent;
  let fixture: ComponentFixture<ModalEmployeesDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalEmployeesDeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalEmployeesDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
