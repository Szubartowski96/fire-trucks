import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalServiceService {
  constructor(private dialog: MatDialog) {}

  openEquipmentModal(): void {
    const dialogRef = this.dialog.open(ModalComponent, {});
  }
}
