import { TestBed, inject } from '@angular/core/testing';

import { ErrorNotificationService } from './error-notification.service';

describe('ErrorNotificationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErrorNotificationService]
    });
  });

  it('should be created', inject([ErrorNotificationService], (service: ErrorNotificationService) => {
    expect(service).toBeTruthy();
  }));
});
