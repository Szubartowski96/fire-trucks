import { TestBed } from '@angular/core/testing';

import { ButtonTextService } from './button-text.service';

describe('ButtonTextService', () => {
  let service: ButtonTextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ButtonTextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
