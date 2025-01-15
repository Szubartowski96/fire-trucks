import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CarData } from '../shared/interfaces/carData.interfaces';

@Injectable({
  providedIn: 'root',
})
export class CarDetailsService {
  carNames: string[] = [];
  type: string[] = [];
  private apiUrl = `${environment}/car`;

  constructor(private _http: HttpClient) {}

  addCar(data: string): Observable<CarData> {
    return this._http.post<CarData>(`${this.apiUrl}`, data);
  }

  updateCar(id: number, data: string): Observable<CarData> {
    return this._http.put<CarData>(`${this.apiUrl}/${id}`, data);
  }

  getCarList(): Observable<CarData> {
    return this._http.get<CarData>(`${this.apiUrl}`);
  }

  getCarById(id: number): Observable<CarData> {
    return this._http.get<CarData>(`${this.apiUrl}/${id}`);
  }

  deleteCar(id: number): Observable<CarData> {
    return this._http.delete<CarData>(`${this.apiUrl}/${id}`);
  }
}
