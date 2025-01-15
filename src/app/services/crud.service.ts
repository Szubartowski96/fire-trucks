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
  private selectedCarData = new BehaviorSubject<CarData | null>(null);
  private basePath = '/cars';

  constructor(private db: AngularFirestore, private dialog: MatDialog) {}

  updateCar(id: string, data: CarData): Promise<void> {
    return this.db.collection('cars').doc(id).update(data);
  }

  addCar(carData: CarData): Promise<CarData> {
    return this.db
      .collection('cars')
      .add(carData)
      .then((docRef: { id: string }) => {
        return { ...carData, id: docRef.id };
      });
  }
  
  getCarList(): Observable<CarData[]> {
    return this.db
      .collection<CarData>(this.basePath)
      .valueChanges({ idField: 'id' });
  }

  getCarById(id: string): Observable<CarData | undefined> {
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

  get selectedCarData$(): Observable<CarData | null> {
    return this.selectedCarData.asObservable();
  }

  getElements(): Observable<CarData[]> {
    return this.getCarList();
  }

  openEquipmentModal(): void {
    this.dialog.open(ModalComponent, {});
  }
}
