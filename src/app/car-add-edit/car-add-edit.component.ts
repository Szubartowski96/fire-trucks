import { Component, OnInit } from '@angular/core';
import { Car } from '../shared/interfaces/car.interfaces';
import { employees } from '../shared/interfaces/eployee.interfaces';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-car-add-edit',
  templateUrl: './car-add-edit.component.html',
  styleUrls: ['./car-add-edit.component.css'],
})
export class CarAddEditComponent implements OnInit {
  cars: Car[] = [
    { value: 'GBA', viewValue: 'GBA' },
    { value: 'GCBA', viewValue: 'GCBA' },
    { value: 'SCD', viewValue: 'SCD' },
    { value: 'SLOP', viewValue: 'SLOP' },
  ];

  users: employees[] = [
    { name: 'John', surname: 'Kowalski' },
    { name: 'John', surname: 'Kowalski' },
    { name: 'John', surname: 'Kowalski' },
    { name: 'John', surname: 'Kowalski' },
    { name: 'John', surname: 'Kowalski' },
    { name: 'John', surname: 'Kowalski' },
  ];

  myControl = new FormControl<string | employees>('');
  options: employees[] = this.users;
  filteredOptions!: Observable<employees[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      })
    );
  }

  displayFn(user: employees): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): employees[] {
    const filterValue = name.toLowerCase();

    return this.options.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }
}
