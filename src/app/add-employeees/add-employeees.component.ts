import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { EmployessService } from '../services/employess.service';
import { NgForm } from '@angular/forms';
import { Employees } from '../shared/interfaces/employees';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';



@Component({
  selector: 'app-add-employeees',
  templateUrl: './add-employeees.component.html',
  styleUrl: './add-employeees.component.css'
})
export class AddEmployeeesComponent implements OnInit  {
@ViewChild('addEmployess') addEmployess!: NgForm;
displayedColumns: string[] = ['name', 'surname']; 
dataSource = new MatTableDataSource<Employees>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  

  
  
constructor(public dialogRef: MatDialog, 
  private employeesService: EmployessService){}
  ngOnInit(): void {
    this.fetchEmployees(); 
  }
  

  onFormSubmit() {
    if (this.addEmployess.valid) {
      const newEmployee = {
        name: this.addEmployess.value.name,
        surname: this.addEmployess.value.surname
      };
  
      this.employeesService.addEmployee(newEmployee).then(() => {
        this.fetchEmployees();
      }).catch(error => {
        console.error('Błąd dodania:', error);
      });
    }
  }
  
  fetchEmployees() {
    this.employeesService.getNameList().subscribe({
      next: (data: Employees[]) => {
        if (data) {
          this.dataSource = new MatTableDataSource(data);
          if (this.sort) {
            this.dataSource.sort = this.sort;
          }
          if (this.paginator) {
            this.dataSource.paginator = this.paginator;
          }
        } else {
          console.warn('Brak danych do wyświetlenia');
        }
      },
      error: (err) => {
        console.error('Błąd pobierania danych:', err);
      }
    });
  }
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
closeModalAddEmployees() {
  this.dialogRef.closeAll();
}
}
