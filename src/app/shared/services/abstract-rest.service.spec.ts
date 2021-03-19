import {TestBed} from '@angular/core/testing';

import {AbstractRestService} from './abstract-rest.service';
import {Volunteer} from '../../models/Volunteer';

describe('AbstractRestService', () => {
  let service: AbstractRestService<Volunteer, string>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbstractRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
