import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarAddEditComponent } from './car-add-edit/car-add-edit.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ModalComponent } from './modal/modal.component';
import { AppRoutingModule } from './app-routing.module';
import { EquipmentCarComponent } from './equipment-car/equipment-car.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { AddEquipmentComponent } from './add-equipment/add-equipment.component';

import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { AngularFireModule } from '@angular/fire/compat';
import { AddEmployeeesComponent } from './add-employeees/add-employeees.component';
import { ModalEmployeesDeleteComponent } from './modal/modal-employees-delete/modal-employees-delete.component';
import { BUCKET } from '@angular/fire/compat/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyD0vkhIlHpjSHRpbfk4SGEhUO2d3dd9Rlg',
  authDomain: 'fire-trucks.firebaseapp.com',
  projectId: 'fire-trucks',
  storageBucket: 'fire-trucks.appspot.com',
  messagingSenderId: '561958466058',
  appId: '1:561958466058:web:b7454d7d123d2dee69a5f3',
};

@NgModule({
  declarations: [
    AppComponent,
    CarAddEditComponent,
    ModalComponent,
    EquipmentCarComponent,
    HomeComponentComponent,
    AddEquipmentComponent,
    AddEmployeeesComponent,
    ModalEmployeesDeleteComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    AppRoutingModule,
    MatGridListModule,
    CommonModule,
    MatCardModule,
    MatListModule,
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  providers: [
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    { provide: BUCKET, useValue: 'my-bucket-name' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}