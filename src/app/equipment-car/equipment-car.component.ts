import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CarData } from '../shared/interfaces/carData.interfaces';
import { Equipment } from '../shared/interfaces/equipments.interfaces';
import { CrudService } from '../services/crud.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';


@Component({
  selector: 'app-equipment-car',
  templateUrl: './equipment-car.component.html',
  styleUrls: ['./equipment-car.component.css'],
})
export class EquipmentCarComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'count', 'comments'];
  dataSource = new MatTableDataSource<Equipment>();
  carData!: CarData;
  carPhotoUrl: string | null = null;

  constructor(private dataService: CrudService,
    private storage: AngularFireStorage,
  ) {}

  ngOnInit(): void {
    this.dataService.selectedCarData$.subscribe((carData) => {
      this.carData = carData;
      if (carData) {
        this.loadEquipmentData(carData);
        this.loadCarPhoto(carData.link)
      } else {
        this.clearTableData();
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadEquipmentData(carData: CarData) {
    this.dataService.getElements().subscribe((data) => {
      this.dataSource.data = carData.equipments;
    });
  }

  clearTableData(): void {
    this.dataSource.data = [];
  }

  loadCarPhoto(filePath: string | null): void {
    if (filePath) {
      this.storage.ref(filePath).getDownloadURL().subscribe(
        (url) => {
          this.carPhotoUrl = url;  
        },
        (error) => {
          console.error("Error loading image:", error);
          this.carPhotoUrl = null;  
        }
      );
    } else {
      this.carPhotoUrl = null;
    }
  }
}
