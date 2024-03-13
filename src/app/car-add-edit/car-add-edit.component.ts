import { Component, OnInit } from '@angular/core';
import { Car } from '../shared/interfaces/car.interfaces';
import { employees } from '../shared/interfaces/eployee.interfaces';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { carDetailsService } from '../services/car-details.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MatDialogRef } from '@angular/material/dialog';

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
    { name: 'Paweł', surname: 'Nowak' },
    { name: 'Artur', surname: 'Izdebski' },
    { name: 'Przemek', surname: 'Adamiak' },
    { name: 'Marcin', surname: 'Sudół' },
    { name: 'Łukasz', surname: 'Zebra' },
  ];

  myControl = new FormControl<string | employees>('');
  options: employees[] = this.users;
  filteredOptions!: Observable<employees[]>;
  empForm: FormGroup;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const inputValue =
          typeof value === 'string'
            ? value
            : value?.name + ' ' + value?.surname;
        return inputValue ? this._filter(inputValue) : this.options.slice();
      })
    );
  }

  displayFn(user: employees): string {
    return user && user.name ? `${user.name} ${user.surname}` : '';
  }

  private _filter(inputValue: string): employees[] {
    const filterValue = inputValue.toLowerCase();

    return this.options.filter((option) =>
      (option.name.toLowerCase() + ' ' + option.surname.toLowerCase()).includes(
        filterValue
      )
    );
  }
  constructor(
    private _fb: FormBuilder,
    private _carService: carDetailsService,
    private _dialogRef: MatDialogRef<CarAddEditComponent>
  ) {
    this.empForm = this._fb.group({
      carName: '',
      type: '',
      marking: '',
      dateEntry: '',
      destiny: '',
      operationalNumber: '',
      employee: '',
    });
    this.myControl.valueChanges.subscribe((newValue) => {
      this.empForm.patchValue({ employee: newValue });
    });
  }
  onFormSubmit() {
    if (this.empForm.valid) {
      this._carService.addCar(this.empForm.value).subscribe({
        next: (val: any) => {
          this._dialogRef.close(true);
        },
        error: (err: any) => {
          console.error(err);
        },
      });
    }
  }
}
