import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ModalServiceService {


  constructor(private dialog: MatDialog,
    private http: HttpClient,
    
  ) {}

  openEquipmentModal(): void {
    const dialogRef = this.dialog.open(ModalComponent, {});
  }
  
}
