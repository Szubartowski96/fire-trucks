import { Component,  OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { DataServiceService } from '../services/data-service.service';
import { CarData } from '../shared/interfaces/carData.interfaces';
import { PeriodicElement } from '../shared/interfaces/table.interfaces';


@Component({
  selector: 'app-equipment-car',
  templateUrl: './equipment-car.component.html',
  styleUrl: './equipment-car.component.css',
})
export class EquipmentCarComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>();
  carData!: CarData;


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private dataService: DataServiceService,
  ) {}

  ngOnInit(): void {
    this.dataService.selectedCarData$.subscribe((carData) => {
      this.carData = carData;
    });

    this.dataService.getElements().subscribe((data) => {
      this.dataSource.data = data;
    })
  }
}
