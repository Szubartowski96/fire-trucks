import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ModalComponent } from '../modal/modal.component';
import { CarData } from '../shared/interfaces/carData.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private homeData: any[] = [];
  private selectedCarData = new BehaviorSubject<any>(null);
  private basePath = '/car';

  constructor(
    private db: AngularFireDatabase,
    private dialog: MatDialog
  ) {}

  
  addCar(data: CarData): void {
    this.db.list(this.basePath).push(data);
  }

  updateCar(id: string, data: CarData): Promise<void> {
    return this.db.object(`${this.basePath}/${id}`).update(data);
  }

  getCarList(): Observable<CarData[]> {
    return this.db.list<CarData>(this.basePath).valueChanges();
  }

  getCarById(id: string): Observable<CarData> {
    return this.db.object<CarData>(`${this.basePath}/${id}`).valueChanges().pipe(
      map(car => car || {} as CarData) 
    );
  }

  deleteCar(id: string): Promise<void> {
    return this.db.object(`${this.basePath}/${id}`).remove();
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
