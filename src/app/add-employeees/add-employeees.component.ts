import { Component, ViewChild } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { EmployessService } from '../services/employess.service';
import { NgForm } from '@angular/forms';
import { Employees } from '../shared/interfaces/eployee.interfaces';


@Component({
  selector: 'app-add-employeees',
  templateUrl: './add-employeees.component.html',
  styleUrl: './add-employeees.component.css'
})
export class AddEmployeeesComponent  {
  @ViewChild('addEmployess') addEmployess!: NgForm;
  private homeData: Employees[] = [];
  
constructor(public dialogRef: MatDialog, 
  private employeesService: EmployessService){}

  onFormSubmit() {
    if (this.addEmployess.valid) {
      const newEmployee = {
        name: this.addEmployess.value.name,
        surname: this.addEmployess.value.surname
      };
  
      this.employeesService.addEmployee(newEmployee).then(() => {
        console.log('Pracownik dodany:', newEmployee);
      }).catch(error => {
        console.error('Błąd dodania:', error);
      });
    }
  }
  
closeModalAddEmployees() {
  this.dialogRef.closeAll();
}
}
