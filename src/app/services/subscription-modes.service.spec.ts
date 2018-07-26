import { TestBed, inject } from '@angular/core/testing';

import { SubscriptionModesService } from './subscription-modes.service';

describe('SubscriptionModesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubscriptionModesService]
    });
  });

  it('should be created', inject([SubscriptionModesService], (service: SubscriptionModesService) => {
    expect(service).toBeTruthy();
  }));
});
