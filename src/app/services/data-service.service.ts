import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

import { CarData } from '../shared/interfaces/carData.interfaces';

@Injectable({
  providedIn: 'root',
})
export class DataServiceService {
  private homeData: any[] = [];
  private selectedCarData = new BehaviorSubject<any>(null);
  private apiUrl = `${environment.apiUrl}/car`;

  constructor(private http: HttpClient) {}

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
  getElements(): Observable<CarData[]> {
    return this.http.get<CarData[]>(this.apiUrl);
  }
}
