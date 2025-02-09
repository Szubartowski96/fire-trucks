import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from '../core/core.service';
import { CarAddEditComponent } from '../car-add-edit/car-add-edit.component';
import { DataServiceService } from '../services/data-service.service';
import { CarData } from '../shared/interfaces/carData.interfaces';
import { CrudService } from '../services/crud.service';
import { DialogData } from '../shared/interfaces/dialog-data';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css'],
})
export class HomeComponentComponent implements OnInit {
  displayedColumns: string[] = [
    'carName',
    'type',
    'marking',
    'dateEntry',
    'destiny',
    'operationalNumber',
    'employee',
    'action',
  ];
  dataSource!: MatTableDataSource<CarData>;
  filteredCars: CarData[] = [];
  allCars: CarData[] = [];
  filterValue = '';
  showNoEquipmentMessage = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _carService: CrudService,
    private _coreService: CoreService,
    private dataService: DataServiceService
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
        this.dataService.setHomeData(res);
        this.allCars = res;
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

    this.applyEquipmentFilter(event);
  }

  deleteCar(id: string) {
    this._carService
      .deleteCar(id)
      .then(() => {
        this._coreService.openSnackBar('Car deleted');
        this.getCarList();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  openEditForm(data: DialogData) {
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

  applyEquipmentFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();

    if (filterValue) {
      this.filteredCars = this.allCars
        .map((car) => {
          if (!car.equipments || !Array.isArray(car.equipments)) {
            return { ...car, filteredEquipments: [] };
          }

          const filteredEquipments = car.equipments.filter(
            (equipment) =>
              equipment.name.toLowerCase().includes(filterValue) ||
              equipment.position.toLowerCase().includes(filterValue)
          );

          return { ...car, filteredEquipments };
        })
        .filter((car) => car.filteredEquipments.length > 0);

      this.showNoEquipmentMessage = this.filteredCars.length === 0;

      this.dataSource.data = this.filteredCars;
    } else {
      this.filteredCars = [];
      this.showNoEquipmentMessage = false;
      this.dataSource.data = this.allCars;
    }
  }
}
