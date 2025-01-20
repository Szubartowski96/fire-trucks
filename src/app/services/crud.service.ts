import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { ModalComponent } from '../modal/modal.component';
import { CarData } from '../shared/interfaces/carData.interfaces';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  private homeData: CarData[] = [];

  private basePath = '/cars';

  private readonly defaultCarData: CarData = {
    carName: 'Unknown Car',
    type: 'Unknown Type',
    marking: 'N/A',
    dateEntry: '1970-01-01',
    destiny: 0,
    operationalNumber: '0000',
    employee: {
      name: 'Unknown',
      surname: 'Employee',
    },
    id: '0',
    link: 'https://example.com',
    imagePath: '/assets/default-car-image.png',
    equipments: [], 
    filteredEquipments: [], 
  };
  

  private selectedCarData = new BehaviorSubject<CarData>(this.defaultCarData);

  constructor(private db: AngularFirestore, private dialog: MatDialog) {}

  updateCar(id: string, data: CarData): Promise<void> {
    return this.db.collection('cars').doc(id).update(data);
  }

  addCar(data: CarData): Promise<void> {
    const id = this.db.createId();
    return this.db.collection('cars').doc(id).set(data);
  }

  getCarList(): Observable<CarData[]> {
    return this.db
      .collection<CarData>(this.basePath)
      .valueChanges({ idField: 'id' });
  }

  getCarById(id: number): Observable<CarData | undefined> {
    return this.db
      .collection<CarData>(this.basePath)
      .doc(id.toString())
      .valueChanges({ idField: 'id' });
  }

  deleteCar(id: string): Promise<void> {
    return this.db.collection(this.basePath).doc(id).delete();
  }

  setHomeData(data: CarData[]): void {
    this.homeData = data;
  }

  getHomeData(): CarData[] {
    return this.homeData;
  }

  setSelectedCarData(data: CarData): void {
    this.selectedCarData.next(data);
  }

  get selectedCarData$(): Observable<CarData> {
    return this.selectedCarData.asObservable();
  }

  getElements(): Observable<CarData[]> {
    return this.getCarList();
  }

  openEquipmentModal(): void {
    this.dialog.open(ModalComponent, {});
  }
}
