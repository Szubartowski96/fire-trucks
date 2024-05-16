import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { HttpClient } from '@angular/common/http';


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
  
}
