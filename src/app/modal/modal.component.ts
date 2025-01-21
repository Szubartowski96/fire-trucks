import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { CrudService } from '../services/crud.service';
import { CarData } from '../shared/interfaces/carData.interfaces';

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
  };

  private selectedCarId: number | undefined;

  constructor(
    private CarService: CrudService,
    public _dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CarData,
  ) {}
  ngOnInit(): void {
    this.getCarNames();
  }
  getCarNames() {
    this.CarService.getCarList().subscribe({
      next: (res: CarData[]) => {
        this.carNames = res.map((car) => ({ id: car.id, name: car.carName }));
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  onCarSelectionChange(event: MatSelectChange): void {
    this.selectedCarId = event.value;
  }

  sumbit() {
    if (!this.selectedCarId) return;

    this.CarService.getCarById(this.selectedCarId).subscribe({
      next: (res) => {
        const imagePath = `assets/images/${res!.link}`;
        this.selectedCar = { ...res, imagePath };
        // this.CarService.setSelectedCarData(this.selectedCar);
        this._dialogRef.close(this.selectedCar);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  closeModal() {
    this._dialogRef.close(this.selectedCar);
  }
}
