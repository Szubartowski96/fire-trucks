import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator  } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CarDetailsService } from '../services/car-details.service';
import { CoreService } from '../core/core.service';
import { CarAddEditComponent } from '../car-add-edit/car-add-edit.component';
import { DataServiceService } from '../services/data-service.service';
import { Equipment } from '../shared/interfaces/equipments.interfaces';
import { CarData } from '../shared/interfaces/carData.interfaces';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.css'
})
export class HomeComponentComponent implements OnInit {

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
  filteredCars: CarData[] = [];  
  allCars: CarData[] = [];  
  filterValue: string = '';
  showNoEquipmentMessage: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  

  constructor(
    private _dialog: MatDialog,
    private _carService: CarDetailsService,
    private _coreService: CoreService,
    private dataService: DataServiceService,
  
    
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


  applyEquipmentFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase(); 


    if (this.filterValue) {
      this.filteredCars = this.allCars.map(car => {
        const filteredEquipments = car.equipments?.filter((equipment: Equipment) =>
          equipment.name.toLowerCase().includes(this.filterValue) ||
          equipment.position.toLowerCase().includes(this.filterValue)
        ) || [];
        return { ...car, filteredEquipments };
      }).filter(car => car.filteredEquipments && car.filteredEquipments.length > 0);
      this.showNoEquipmentMessage = this.filteredCars.length === 0;
    } else {
      this.filteredCars = [];
      this.showNoEquipmentMessage = false;
    }
  }
  
}





