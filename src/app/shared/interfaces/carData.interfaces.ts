import { Equipment } from './equipments.interfaces';

export interface CarData {
  carName: string;
  type: string;
  marking: string;
  dateEntry: string;
  destiny: number;
  operationalNumber: string;
  employee: {
    name: string;
    surname: string;
  };
  id: number;
  link: string;
  imagePath: string;
  equipments: Equipment[];
  filteredEquipments?: Equipment[];
}
