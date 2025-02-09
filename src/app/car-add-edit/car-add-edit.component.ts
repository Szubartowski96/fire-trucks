import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Car } from '../shared/interfaces/car.interfaces';
import { Employees } from '../shared/interfaces/eployee.interfaces';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { CrudService } from '../services/crud.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FileUploadEvent } from 'primeng/fileupload';
import { DialogData } from '../shared/interfaces/dialog-data';
import { EmployessService } from '../services/employess.service';

@Component({
  selector: 'app-car-add-edit',
  templateUrl: './car-add-edit.component.html',
  styleUrls: ['./car-add-edit.component.css'],
})
export class CarAddEditComponent implements OnInit, OnDestroy {
  cars: Car[] = [
    { value: 'GBA', viewValue: 'GBA' },
    { value: 'GCBA', viewValue: 'GCBA' },
    { value: 'SCD', viewValue: 'SCD' },
    { value: 'SLOP', viewValue: 'SLOP' },
  ];

  users: Employees[] = [];

  emloyeeFormControl = new FormControl<string | Employees>('');
  options: Employees[] = this.users;
  filteredOptions!: Observable<Employees[]>;
  empForm: FormGroup;
  localFile: File | null = null;
  private employeeSubscription: Subscription;
  constructor(
    private _fb: FormBuilder,
    private _carService: CrudService,
    private _dialogRef: MatDialogRef<CarAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _coreService: CoreService,
    private fireStorage: AngularFireStorage,
    private employeesService: EmployessService
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
    this.employeesService.getNameList().subscribe({
      next: (employees: Employees[]) => {
        this.users = employees.map((employee) => ({
          name: employee.name,
          surname: employee.surname,
        }));
        this.options = [...this.users];
      },
      error: (error) => console.error('Błąd pobierania', error),
    });
    this.employeeSubscription = this.emloyeeFormControl.valueChanges.subscribe(
      (selectedUser) => {
        this.empForm.patchValue({ employee: selectedUser });
      }
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
          .updateCar(this.data.id!, formData)
          .then(() => {
            this._coreService.openSnackBar('Car details updated');
            this._dialogRef.close(true);
          })
          .catch((err: Error) => {
            console.error('Update error:', err);
            this._coreService.openSnackBar('Failed to update car details');
          });
      } else {
        this._carService
          .addCar(formData)
          .then((savedCar) => {
            this._coreService.openSnackBar('Car added successfully');

            if (this.localFile) {
              const carId = savedCar.id;
              const path = `files/${carId}`;

              this.fireStorage
                .upload(path, this.localFile)
                .then(() => {
                  console.log('Image uploaded successfully');
                })
                .catch((err: Error) => {
                  console.error('Upload error:', err);
                });
            }

            this._dialogRef.close(true);
          })
          .catch((err: Error) => {
            console.error('Add error:', err);
            this._coreService.openSnackBar('Failed to add car');
          });
      }
    }
  }

  async onUpload($event: FileUploadEvent) {
    const file = $event.files[0];
    if (file) {
      this.localFile = file;

      console.log(this.localFile);
    }
  }
}
