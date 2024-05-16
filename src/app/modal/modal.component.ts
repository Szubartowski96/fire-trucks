import { Component, OnInit, Inject } from '@angular/core';
import { CarDetailsService } from '../services/car-details.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { ModalServiceService } from '../services/modal-service.service';
import { MatSelectChange } from '@angular/material/select';
import { DataServiceService } from '../services/data-service.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent implements OnInit {
  carNames: { id: number; name: string }[] = [];
  dialogRef!: MatDialogRef<ModalComponent, void>;
  selectedCarName: string = '';

  private selectedCar!: number;
  private selectedCarId: number | undefined;

  constructor(
    private CarService: CarDetailsService,
    private dataService: DataServiceService,
    public _dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}
  ngOnInit(): void {
    this.getCarNames();
  }
  getCarNames() {
    this.CarService.getCarList().subscribe({
      next: (res: any[]) => {
        this.carNames = res.map((car) => ({ id: car.id, name: car.carName }));
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  onCarSelectionChange(event: MatSelectChange): void {
    this.selectedCarId = event.value;
    console.log(this.selectedCarId);
  }

sumbit() {
  if (!this.selectedCarId) return;
  this.CarService.getCarById(this.selectedCarId).subscribe({
    next: (res) => {
      console.log(res);
      const imagePath = `assets/images/${res.link}`;
      this.selectedCar = { ...res, imagePath };
      this.dataService.setSelectedCarData(this.selectedCar);
      this._dialogRef.close(this.selectedCar);
    },
    error: (err) => {
      console.log(err);
    }
  });
}

  closeModal() {
    this._dialogRef.close(this.selectedCar);
  }
}
