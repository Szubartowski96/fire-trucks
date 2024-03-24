import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CarAddEditComponent } from './car-add-edit/car-add-edit.component';
import { carDetailsService } from './services/car-details.service';
import { MatPaginator  } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from './core/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'carName',
    'type',
    'marking',
    'dateEntry',
    'destiny',
    'operationalNumber',
    'employee',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _carService: carDetailsService,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.getCarList();
  }
  openAddEditDialog() {
    const dialogRef = this._dialog.open(CarAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCarList();
        }
      },
    });
  }

  getCarList() {
    this._carService.getCarList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteCar(id: number) {
    this._carService.deleteCar(id).subscribe({
      next: (res) => {
     
        this._coreService.openSnackBar('Car deleted', 'ok');
        this.getCarList();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(CarAddEditComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCarList();
        }
      },
    });
  }
}
