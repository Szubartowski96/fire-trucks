import { Component,  OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { DataServiceService } from '../services/data-service.service';
import { CarData } from '../shared/interfaces/carData.interfaces';


export interface PeriodicElement {
  section?: string;
  name: string;
  position: number | null
 count: number | null;
  coments: string;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   { position: null, name: '', count: null, coments: '' },
//   { position: 1, name: 'Hydrogen', count: 1.0079, coments: 'H' },
//   { position: 1, name: 'Hydrogen', count: 1.0079, coments: 'H' },
  
// ];

@Component({
  selector: 'app-equipment-car',
  templateUrl: './equipment-car.component.html',
  styleUrl: './equipment-car.component.css',
})
export class EquipmentCarComponent implements OnInit {
[x: string]: any;
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
