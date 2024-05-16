import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarDetailsService {
  carNames: string[] = [];
  type: string[] = [];

  constructor(private _http: HttpClient) {}
  addCar(data: string): Observable<any> {
    return this._http.post(' http://localhost:3000/car', data);
  }
  updateCar(id: number, data: string): Observable<any> {
    return this._http.put(` http://localhost:3000/car/${id}`, data);
  }
  getCarList(): Observable<any> {
    return this._http.get(' http://localhost:3000/car');
  }
  getCarById(id: number): Observable<any> {
    return this._http.get(`http://localhost:3000/car/${id}`);
  }
  deleteCar(id: number): Observable<any> {
    return this._http.delete(` http://localhost:3000/car/${id}`);
  }
  
}
