import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalServiceService {
  private apiUrl = 'http://localhost:3000/car/';

  constructor(private dialog: MatDialog,
    private http: HttpClient,
    
  ) {}

  openEquipmentModal(): void {
    const dialogRef = this.dialog.open(ModalComponent, {});
  }

  getNameCar(carId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}${carId}`);
   
  }
}
