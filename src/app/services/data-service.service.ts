import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataServiceService {
  private homeData: any[] = [];

  constructor() {}

  setHomeData(data: any[]) {
    this.homeData = data;
  }

  getHomeData() {
    return this.homeData;
  }
}
