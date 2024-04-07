import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ButtonTextService {

  buttonText = 'Equipment';

  constructor() { }

  toggleButtonText() {
    this.buttonText = this.buttonText === 'Equipment' ? 'Change Car' : 'Equipment';
  }
}
