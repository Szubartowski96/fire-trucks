import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ButtonTextService {

  buttonText = 'Equipmen';


  constructor() { }

  toggleButtonText() {
    this.buttonText = this.buttonText === 'Equipmen' ? 'Change Car' : 'Equipment';

    
  }
}
