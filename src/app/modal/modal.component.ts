import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { CrudService } from '../services/crud.service';
import { Equipment } from '../../../fire-trucks-main/src/app/shared/interfaces/equipments.interfaces';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent implements OnInit {
  carNames: { id: string; name: string }[] = [];
  dialogRef!: MatDialogRef<ModalComponent, void>;
  selectedCarName = '';

  private selectedCar!: {
    imagePath: string;
    carName?: string;
    type?: string;
    marking?: string;
    dateEntry?: string;
    destiny?: number;
    operationalNumber?: string;
    filteredEquipments?: Equipment[];
  };

  private selectedCarId: number | undefined;

  constructor(
    private CarService: CrudService,
    public _dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.getCarNames();
  }

  getCarNames(): void {
    this.CarService.getCarList().subscribe({
      next: (res: any[]) => {
        this.carNames = res.map((car) => ({ id: car.id, name: car.carName }));
      },
      error: (err) => {
        console.error('Error fetching car names:', err);
      },
    });
  }

  onCarSelectionChange(event: MatSelectChange): void {
    const carId = event.value;
    if (!carId) {
      console.error('Invalid car ID:', event.value);
    } else {
      this.selectedCarId = carId;
    }
  }

  submit() {
    if (!this.selectedCarId) {
      console.error('No car selected');
      return;
    }

    this.CarService.getCarById(this.selectedCarId).subscribe({
      next: (res) => {
        const imagePath = `assets/images/${res!.link}`;
        this.selectedCar = { ...res, imagePath };
        this.CarService.setSelectedCarData(this.selectedCar);
        this._dialogRef.close(this.selectedCar);
      },
      error: (err) => {
        console.error('Error fetching car data:', err);
      },
    });
  }

  closeModal() {
    this._dialogRef.close();
  }
}
