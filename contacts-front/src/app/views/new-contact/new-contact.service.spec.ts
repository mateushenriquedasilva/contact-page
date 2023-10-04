import { TestBed } from '@angular/core/testing';

import { NewContactService } from '../../service/contact.service';

describe('NewContactService', () => {
  let service: NewContactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewContactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
