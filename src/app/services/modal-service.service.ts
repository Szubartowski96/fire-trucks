import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ModalServiceService {
  openEquipmentModal() {
    throw new Error('Method not implemented.');
  }

  constructor(
    private dialog: MatDialog,
    private http: HttpClient
  ) {}
}
