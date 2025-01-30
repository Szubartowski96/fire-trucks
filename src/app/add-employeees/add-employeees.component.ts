import { Component } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-add-employeees',
  templateUrl: './add-employeees.component.html',
  styleUrl: './add-employeees.component.css'
})
export class AddEmployeeesComponent  {
  
constructor(public dialogRef: MatDialog){}
onFormSubmit(){
  console.log('Form submitted')
  this.closeModalAddEmployees()
}
closeModalAddEmployees() {
  this.dialogRef.closeAll();
}
}
