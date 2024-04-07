import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-equipment-car',
  templateUrl: './equipment-car.component.html',
  styleUrl: './equipment-car.component.css'
})
export class EquipmentCarComponent implements OnInit {

constructor(private dialog: MatDialog){}

  ngOnInit(): void {
    this.openModal();
  }

  openModal(){
    this.dialog.open(ModalComponent);
  }


}
