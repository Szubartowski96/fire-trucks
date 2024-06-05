import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-equipment',
  templateUrl: './add-equipment.component.html',
  styleUrl: './add-equipment.component.css'
})
export class AddEquipmentComponent {
  router: any;

  constructor(private dialog: MatDialog){}
  openChangeCarModal(): void {
    this.router.navigate(['/add-equipment']);
  }
}
