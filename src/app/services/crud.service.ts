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
  private homeData: any[] = [];
  private selectedCarData = new BehaviorSubject<any>(null);
  private basePath = '/cars';
  firestore: any;

  constructor(private db: AngularFirestore, private dialog: MatDialog) {}

  updateCar(id: string, data: CarData): Promise<void> {
    return this.db.collection('cars').doc(id).update(data);
  }

  addCar(carData: any): Promise<any> {
    return this.db
      .collection('cars')
      .add(carData)
      .then((docRef: { id: string }) => {
        return { id: docRef.id, ...carData };
      });
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

  setHomeData(data: any[]): void {
    this.homeData = data;
  }

  getHomeData(): any[] {
    return this.homeData;
  }

  setSelectedCarData(data: any): void {
    this.selectedCarData.next(data);
  }

  get selectedCarData$(): Observable<any> {
    return this.selectedCarData.asObservable();
  }

  getElements(): Observable<CarData[]> {
    return this.getCarList();
  }

  openEquipmentModal(): void {
    this.dialog.open(ModalComponent, {});
  }
}
