import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipmentCarComponent } from './equipment-car/equipment-car.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { AddEquipmentComponent } from './add-equipment/add-equipment.component';

const routes: Routes = [
  { path: '', component: HomeComponentComponent },
  { path: 'equipment', component: EquipmentCarComponent },
  { path: 'add-equipment', component: AddEquipmentComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
