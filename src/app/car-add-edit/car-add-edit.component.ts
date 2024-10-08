import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Car } from '../shared/interfaces/car.interfaces';
import { Employees } from '../shared/interfaces/eployee.interfaces';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, map, startWith, Subscription } from 'rxjs';
import { CrudService } from '../services/crud.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FileUploadEvent } from 'primeng/fileupload';

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

  users: Employees[] = [
    { name: 'John', surname: 'Kowalski' },
    { name: 'Paweł', surname: 'Nowak' },
    { name: 'Artur', surname: 'Izdebski' },
    { name: 'Przemek', surname: 'Adamiak' },
    { name: 'Marcin', surname: 'zzz' },
    { name: 'Łukasz', surname: 'Zebra' },
  ];

  emloyeeFormControl = new FormControl<string | Employees>('');
  options: Employees[] = this.users;
  filteredOptions!: Observable<Employees[]>;
  empForm: FormGroup;
  private employeeSubscription: Subscription;
  constructor(
    private _fb: FormBuilder,
    private _carService: CrudService,
    private _dialogRef: MatDialogRef<CarAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService,
    private fireStorage: AngularFireStorage
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
    this.employeeSubscription = this.emloyeeFormControl.valueChanges.subscribe(
      (newValue) => {
        this.empForm.patchValue({ employee: newValue });
      }
    );
  }

  ngOnInit(): void {
    this.filteredOptions = this.emloyeeFormControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const inputValue =
          typeof value === 'string'
            ? value
            : value?.name + ' ' + value?.surname;
        return inputValue ? this._filter(inputValue) : this.options.slice();
      })
    );
    this.empForm.patchValue(this.data);
  }

  displayFn(user: Employees): string {
    return user && user.name ? `${user.name} ${user.surname}` : '';
  }

  private _filter(inputValue: string): Employees[] {
    const filterValue = inputValue.toLowerCase();

    return this.options.filter((option) =>
      (option.name.toLowerCase() + ' ' + option.surname.toLowerCase()).includes(
        filterValue
      )
    );
  }

  ngOnDestroy() {
    if (this.employeeSubscription) {
      this.employeeSubscription.unsubscribe();
    }
  }
  onFormSubmit() {
    if (this.empForm.valid) {
      const formData = this.empForm.value;

      if (this.data) {
        this._carService
          .updateCar(this.data.id, formData)
          .then(() => {
            this._coreService.openSnackBar('Car details updated');
            this._dialogRef.close(true);
          })
          .catch((err: any) => {
            console.error('Update error:', err);
            this._coreService.openSnackBar('Failed to update car details');
          });
      } else {
        this._carService
          .addCar(formData)
          .then(() => {
            this._coreService.openSnackBar('Car added successfully');
            this._dialogRef.close(true);
          })
          .catch((err: any) => {
            console.error('Add error:', err);
            this._coreService.openSnackBar('Failed to add car');
          });
      }
    }
  }
  async onUpload($event: FileUploadEvent) {
    console.log($event);
    const file = $event.files[0];
    if (file) {
      const path = `files/${file.name}`;
      const uploadedFile = await this.fireStorage.upload(path, file);
      console.log(uploadedFile);
    }
  }
}
