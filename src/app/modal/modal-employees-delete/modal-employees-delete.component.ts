import { Component, Inject, OnInit } from '@angular/core';
import {  MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddEmployeeesComponent } from '../../add-employeees/add-employeees.component';

@Component({
  selector: 'app-modal-employees-delete',
  templateUrl: './modal-employees-delete.component.html',
  styleUrl: './modal-employees-delete.component.css'
})
export class ModalEmployeesDeleteComponent implements OnInit {

  constructor( private _dialog: MatDialogRef<AddEmployeeesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string, name: string, surname: string }
  ) { }
  ngOnInit(): void {
    console.log(this.data);;
  }

  
confirmDelete() {
  this._dialog.close('delete');
}
closeModal() {
this._dialog.close();
}

}
