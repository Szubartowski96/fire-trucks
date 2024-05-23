import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CarDetailsService {
  carNames: string[] = [];
  type: string[] = [];
  private apiUrl = `${environment.apiUrl}/car`;

  constructor(private _http: HttpClient) {}

  addCar(data: string): Observable<any> {
    return this._http.post(`${this.apiUrl}`, data);
  }

  updateCar(id: number, data: string): Observable<any> {
    return this._http.put(`${this.apiUrl}/${id}`, data);
  }

  getCarList(): Observable<any> {
    return this._http.get(`${this.apiUrl}`);
  }

  getCarById(id: number): Observable<any> {
    return this._http.get(`${this.apiUrl}/${id}`);
  }

  deleteCar(id: number): Observable<any> {
    return this._http.delete(`${this.apiUrl}/${id}`);
  }
}
