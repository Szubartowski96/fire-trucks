import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployessService } from '../services/employess.service';
import { NgForm } from '@angular/forms';
import { Employees } from '../shared/interfaces/employees';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from '../core/core.service';
import { ModalEmployeesDeleteComponent } from '../modal/modal-employees-delete/modal-employees-delete.component';

@Component({
  selector: 'app-add-employeees',
  templateUrl: './add-employeees.component.html',
  styleUrl: './add-employeees.component.css',
})
export class AddEmployeeesComponent implements OnInit {
  @ViewChild('addEmployess') addEmployess!: NgForm;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['name', 'surname', 'actions'];
  dataSource = new MatTableDataSource<Employees>([]);

  constructor(
    public dialogRef: MatDialog,
    private employeesService: EmployessService,
    private coreService: CoreService
  ) {}
  ngOnInit(): void {
    this.fetchEmployees();
  }

  onFormSubmit() {
    if (this.addEmployess.valid) {
      const newEmployee = {
        name: this.addEmployess.value.name,
        surname: this.addEmployess.value.surname,
      };

      this.employeesService
        .addEmployee(newEmployee)
        .then(() => {
          this.fetchEmployees();
          this.addEmployess.resetForm();
        })
        .catch((error) => {
          console.error('błąd dodania:', error);
        });
    }
  }

  fetchEmployees() {
    this.employeesService.getNameList().subscribe({
      next: (employee: Employees[]) => {
        if (employee) {
          this.dataSource = new MatTableDataSource(employee);
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
      error: (Error) => {
        console.error('Błąd pobierania danych:', Error);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  closeModalAddEmployees() {
    this.dialogRef.closeAll();
  }

  deleteEmployee(id: string, name: string, surname: string) {
    const dialogRef = this.dialogRef.open(ModalEmployeesDeleteComponent, {
      data: { id, name, surname },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'delete') {
        console.log('Delete');
        this.employeesService
          .deleteEmployee(id)
          .then(() => {
            this.coreService.openSnackBar('Employee deleted');
            this.fetchEmployees();
          })
          .catch((Error) => {
            console.error('Error deleting employee:', Error);
          });
      }
    });
  }
}
