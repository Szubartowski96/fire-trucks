import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Employees } from '../shared/interfaces/eployee.interfaces';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class EmployessService {

 private basePath = `${environment}/employees`;
 constructor(private db: AngularFirestore) {}

 
 addEmployee(employee: Employees): Promise<Employees> {
   return this.db
     .collection('employees')
     .add(employee)
     .then((docRef) => {
       return { ...employee, id: docRef.id }; 
     });
 }
}
