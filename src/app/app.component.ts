import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CarAddEditComponent } from './car-add-edit/car-add-edit.component';
import { CarDetailsService } from './services/car-details.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from './core/core.service';
import { ModalServiceService } from './services/modal-service.service';
import { Router, NavigationEnd } from '@angular/router';
import { ModalComponent } from './modal/modal.component';
import { CrudService } from './services/crud.service';

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
  router: any;
  addCarLabel: string = 'Add car';
  equipmentLabel: string = 'Informations about car';

  constructor(
    private _dialog: MatDialog,
    private _carService: CrudService,
    private _coreService: CoreService,
    private modalService: ModalServiceService,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    this.getCarList();
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateButtonLabels(event.url);
      }
    });
  }

  updateButtonLabels(url: string) {
    if (url.includes('/equipment')) {
      this.addCarLabel = 'Back';
      this.equipmentLabel = 'Change Car';
    } else {
      this.addCarLabel = 'Add car';
      this.equipmentLabel = 'Informations about car';
    }
  }

  openChangeCarModal(): void {
    this._dialog.open(ModalComponent);
  }
  openAddEditDialog() {
    if (this._router.url === '/equipment') {
      this._router.navigateByUrl('/');
    } else {
      const dialogRef = this._dialog.open(CarAddEditComponent);
      dialogRef.afterClosed().subscribe({
        next: (val) => {
          if (val) {
            this.getCarList();
          }
        },
      });
    }
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

  deleteCar(id: string) {
    this._carService.deleteCar(id)
      .then(() => {
        this._coreService.openSnackBar('Car deleted', 'ok');
        this.getCarList();
      })
      .catch((err) => {
        console.log(err);
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
  openEquipmentModal(): void {
    this.modalService.openEquipmentModal();
  }
}
