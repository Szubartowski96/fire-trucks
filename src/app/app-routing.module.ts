import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipmentCarComponent } from './equipment-car/equipment-car.component';

const routes: Routes = [
  {path: 'equipment', component:EquipmentCarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
