import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CarData } from '../shared/interfaces/carData.interfaces';
import { Equipment } from '../shared/interfaces/equipments.interfaces';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-equipment-car',
  templateUrl: './equipment-car.component.html',
  styleUrl: './equipment-car.component.css',
})
export class EquipmentCarComponent implements OnInit {
  displayedColumns = ['position', 'name', 'count', 'comments'];
  dataSource = new MatTableDataSource<Equipment>();
  carData!: CarData;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private dataService: CrudService) {}

  ngOnInit(): void {
    this.dataService.selectedCarData$.subscribe((carData) => {
      if (carData) {
        this.carData = carData;
        this.loadEquipmentData(carData);
      } else {
        this.clearTableData();
      }
    });
  }

  loadEquipmentData(carData: CarData) {
    this.dataService.getElements().subscribe(() => {
      this.dataSource.data = carData.equipments;
    });
  }

  clearTableData(): void {
    this.dataSource.data = [];
  }
}