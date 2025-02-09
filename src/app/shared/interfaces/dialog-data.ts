import { Employees } from './eployee.interfaces';

export interface DialogData {
  carName: string;
  type: string;
  marking: string;
  dateEntry: string;
  destiny: string;
  operationalNumber: string;
  employee: Employees;
  id?: string;
}
