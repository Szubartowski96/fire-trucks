import { Component, OnInit, OnDestroy } from '@angular/core';
import { Form, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { DataServiceService } from '../services/data-service.service';
import { CarData } from '../shared/interfaces/carData.interfaces';
import { MatTableDataSource } from '@angular/material/table';
import { Equipment } from '../shared/interfaces/equipments.interfaces';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-equipment',
  templateUrl: './add-equipment.component.html',
  styleUrls: ['./add-equipment.component.css'],
})
export class AddEquipmentComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['position', 'name', 'count', 'comments', 'actions'];
  dataSource = new MatTableDataSource<Equipment>();
  carData!: CarData;
  newEquipment: Equipment = { position: '', name: '', count: 1, comments: '' };
  private carDataSubscription: Subscription | undefined;
  equipmentForm!: FormGroup;
  
  constructor(
    private dataService: DataServiceService,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.equipmentForm = this.fb.group({
      position: ['', Validators.required],
      name: ['', Validators.required],
      count: [1, [Validators.required, Validators.min(1)]],
      comments: ['']
    });

    this.carDataSubscription = this.dataService.selectedCarData$.subscribe((carData) => {
      this.carData = carData;
      this.loadEquipmentData(carData);
    });
  }

  loadEquipmentData(carData: CarData): void {
    if (carData && carData.equipments) {
      this.dataSource.data = carData.equipments;
    }
  }

  addEquipment(form: NgForm): void {
    if (form.valid) {
      const newEquipment: Equipment = form.value
      const data = this.dataSource.data;
      data.push(newEquipment);
      this.dataSource.data = data;
      this.equipmentForm.reset({ position: '', name: '', count: 0, comments: '' });
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
