import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CarAddEditComponent } from './car-add-edit/car-add-edit.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'apopointment-app';
  constructor(private _dialog: MatDialog) {}

  openAddEditDialog() {
    this._dialog.open(CarAddEditComponent);
  }
}
