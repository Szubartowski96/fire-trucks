import { Component } from '@angular/core';
import { DataServiceService } from '../services/data-service.service';

import { CarData } from '../shared/interfaces/carData.interfaces';
import { MatTableDataSource } from '@angular/material/table';
import { Equipment } from '../shared/interfaces/equipments.interfaces';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-add-equipment',
  templateUrl: './add-equipment.component.html',
  styleUrls: ['./add-equipment.component.css']
})
export class AddEquipmentComponent {
  [x: string]: any;
  displayedColumns: string[] = ['position', 'name', 'count', 'comments'];
  dataSource = new MatTableDataSource<Equipment>();
  carData!: CarData;
  private carDataSubscription: Subscription | undefined;

  constructor(private dataService: DataServiceService, public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.dataService.selectedCarData$.subscribe((carData) => {
      this.carData = carData;
      this.loadEquipmentData(carData);
  
    });
  }
  loadEquipmentData(carData: CarData): void {
    if (carData && carData.equipments) {
      this.dataSource.data = carData.equipments;
    }
  }

}
