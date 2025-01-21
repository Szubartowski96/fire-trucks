import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentCarComponent } from './equipment-car.component';

describe('EquipmentCarComponent', () => {
  let component: EquipmentCarComponent;
  let fixture: ComponentFixture<EquipmentCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EquipmentCarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EquipmentCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
