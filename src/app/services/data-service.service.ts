import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataServiceService {
  private homeData: any[] = [];
  private selectedCarData = new BehaviorSubject<any>(null);

  constructor() {}

  setHomeData(data: any[]) {
    this.homeData = data;
  }

  getHomeData() {
    return this.homeData;
  }

  selectedCarData$ = this.selectedCarData;

  setSelectedCarData(data: any) {
    this.selectedCarData.next(data);
  }
}
