import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class carDetailsService {
  carNames: string[] = [];
  type: string [] = [];

  constructor(private _http: HttpClient) {}
  addCar(data: any): Observable<any> {
    return this._http.post(' http://localhost:3000/car', data);
  }
  updateCar(id: number, data: any): Observable<any> {
    return this._http.put(` http://localhost:3000/car/${id}`, data);
  }
  getCarList(): Observable<any> {
    return this._http.get(' http://localhost:3000/car');
  }
  deleteCar(id: number): Observable<any> {
    return this._http.delete(` http://localhost:3000/car/${id}`);
  }
}
