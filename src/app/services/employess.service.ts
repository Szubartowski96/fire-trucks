import { Injectable } from '@angular/core';

import { Employees } from '../shared/interfaces/eployee.interfaces';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployessService {

  private basePath = 'employees';
 constructor(private db: AngularFirestore) {}

 
 addEmployee(employee: Employees): Promise<Employees> {
   return this.db
     .collection('employees')
     .add(employee)
     .then((docRef) => {
       return { ...employee, id: docRef.id }; 
     });
 }

 getNameList(): Observable<Employees[]> {
  return this.db.collection<Employees>(this.basePath).valueChanges({ idField: 'id' });
}
deleteEmployee(id: string): Promise<void> {
  return this.db.collection(this.basePath).doc(id).delete();
}
updateEmployee(employee: Employees): Promise<void> {
  return this.db.collection(this.basePath).doc().update({
    name: employee.name,
    surname: employee.surname
  });
}

}
