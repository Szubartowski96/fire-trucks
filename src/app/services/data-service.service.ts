import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PeriodicElement } from '../shared/interfaces/table.interfaces';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataServiceService {
  private homeData: any[] = [];
  private selectedCarData = new BehaviorSubject<any>(null);
  private apiUrl = `${environment.apiUrl}/equipment`;

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
  getElements(): Observable<PeriodicElement[]> {
    return this.http.get<PeriodicElement[]>(this.apiUrl);
  }
}
