import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { CarData } from '../shared/interfaces/carData.interfaces';
import { MatTableDataSource } from '@angular/material/table';
import { Equipment } from '../shared/interfaces/equipments.interfaces';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-add-equipment',
  templateUrl: './add-equipment.component.html',
  styleUrls: ['./add-equipment.component.css'],
})
export class AddEquipmentComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'position',
    'name',
    'count',
    'comments',
    'actions',
  ];
  dataSource = new MatTableDataSource<Equipment>();
  carData!: CarData;
  newEquipment: Equipment = { position: '', name: '', count: 1, comments: '' };
  private carDataSubscription: Subscription | undefined;
  equipmentForm!: FormGroup;

  constructor(
    private crudService: CrudService,
    public dialog: MatDialog,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.equipmentForm = this.fb.group({
      position: ['', Validators.required],
      name: ['', Validators.required],
      count: [1, [Validators.required, Validators.min(1)]],
      comments: [''],
    });

    this.carDataSubscription = this.crudService.selectedCarData$.subscribe(
      (carData) => {
        if (carData) {
          this.carData = carData;
          this.loadEquipmentData(carData);
        } else {
          console.error('Dane samochodu są puste lub niezdefiniowane.');
        }
      },
    );
  }

  loadEquipmentData(carData: CarData): void {
    if (carData && carData.equipments) {
      this.dataSource.data = carData.equipments;
    }
  }

  addEquipment(form: NgForm): void {
    if (form.valid) {
      if (this.carData && this.carData.id) {
        const newEquipment: Equipment = form.value;
        const data = this.dataSource.data;
        data.push(newEquipment);
        this.dataSource.data = data;

        const carId = this.carData.id.toString();

        this.crudService
          .updateCar(carId, {
            ...this.carData,
            equipments: data,
          })
          .then(() => {
            console.log('Wyposażenie dodane do Firebase');
          })
          .catch((error) => {
            console.error('Błąd podczas aktualizacji samochodu:', error);
          });

        form.resetForm({
          position: '',
          name: '',
          count: 0,
          comments: '',
        });
      } else {
        console.error('carData lub carData.id są niedostępne');
      }
    }
  }

  removeEquipment(index: number): void {
    const data = this.dataSource.data;
    data.splice(index, 1);
    this.dataSource.data = data;
  }

  ngOnDestroy(): void {
    if (this.carDataSubscription) {
      this.carDataSubscription.unsubscribe();
    }
  }
}
