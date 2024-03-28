import { Component, OnInit, Inject } from '@angular/core';
import { CarDetailsService } from '../services/car-details.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent implements OnInit {
  carNames: string[] = [];
  dialogRef: any;

  constructor(
    private CarService: CarDetailsService,
    public _dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    this.getCarNames();
  }
  getCarNames() {
    this.CarService.getCarList().subscribe({
      next: (res: any[]) => {
        this.carNames = res.map((car) => car.carName);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  onCarSelectionChange(event: any): void {
    const selectedCarName = event.value;
  }

  closeModal() {
    this._dialogRef.close();
  }
}
