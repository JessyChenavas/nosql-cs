import { TestBed } from '@angular/core/testing';

import { NoSqlService } from './no-sql.service';

describe('NoSqlService', () => {
  let service: NoSqlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoSqlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
