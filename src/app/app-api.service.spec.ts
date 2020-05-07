import { TestBed } from '@angular/core/testing';

import { AppAPIService } from './app-api.service';

describe('AppAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppAPIService = TestBed.get(AppAPIService);
    expect(service).toBeTruthy();
  });
});
