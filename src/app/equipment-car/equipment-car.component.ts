import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DataServiceService } from '../services/data-service.service';
import { CarData } from '../shared/interfaces/carData.interfaces';
import { Equipment } from '../shared/interfaces/equipments.interfaces';

@Component({
  selector: 'app-equipment-car',
  templateUrl: './equipment-car.component.html',
  styleUrl: './equipment-car.component.css',
})
export class EquipmentCarComponent implements OnInit {
  [x: string]: any;
  displayedColumns: string[] = ['position', 'name', 'count', 'comments'];
  dataSource = new MatTableDataSource<Equipment>();
  carData!: CarData;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private dataService: DataServiceService) {}

  ngOnInit(): void {
    this.dataService.selectedCarData$.subscribe((carData) => {
      this.carData = carData;
      console.log(carData);
      if (carData) {
        this.loadEquipmentData(carData);
      }
    });
  }

  loadEquipmentData(carData: CarData) {
    this.dataService.getElements().subscribe((data) => {
      this.dataSource.data = carData.equipments;
     
    });
  }
}
