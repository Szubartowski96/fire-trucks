import { Component, OnDestroy, OnInit, Inject } from '@angular/core';
import { carDetailsService } from '../../../services/car-details.service';
import { Subscription } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent implements OnInit, OnDestroy {
  carNames: string[] = [];
  carSubscription: Subscription | undefined;
  dialogRef: any;

  constructor(
    private carService: carDetailsService,
    public _dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    this.getCarNames();
  }
  getCarNames() {
    this.carSubscription = this.carService.getCarList().subscribe({
      next: (res: any[]) => {
        this.carNames = res.map((car) => car.carName);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  ngOnDestroy(): void {
    if (this.carSubscription) {
      this.carSubscription.unsubscribe();
    }
  }
  closeModal() {
    this._dialogRef.close();
  }
}
