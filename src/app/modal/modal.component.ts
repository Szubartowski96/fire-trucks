import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { CrudService } from '../services/crud.service';
import { DialogData } from '../shared/interfaces/dialog-data';
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

  private selectedCar: CarData | null = null;
  private selectedCarId: string | null = null; 

  constructor(
    private CarService: CrudService,
    public _dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    this.getCarNames();
  }

 
  getCarNames(): void {
    this.CarService.getCarList().subscribe({
      next: (res: CarData[]) => {
        console.log('Car data received:', res);
  
        
        this.carNames = res.map((car) => ({
          id: String(car.id),  
          name: car.carName || 'Unnamed Car',  
        }));
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
      console.log('Selected Car ID:', this.selectedCarId); 
    }
  }

  
  submit() {
    if (!this.selectedCarId) {
      console.error('No car selected');
      return;
    }

    this.CarService.getCarById(this.selectedCarId).subscribe({
      next: (res: CarData | undefined) => {
        if (!res) {
          console.error('No car data received');
          return;
        }

        const imagePath = `assets/images/${res.link || 'default.jpg'}`;

        
        this.selectedCar = {
          ...res,
          imagePath,
        };

        
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
