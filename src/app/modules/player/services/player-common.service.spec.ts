import { TestBed, inject } from '@angular/core/testing';

import { PlayerCommonService } from './player-common.service';

describe('PlayerCommonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlayerCommonService]
    });
  });

  it('should be created', inject([PlayerCommonService], (service: PlayerCommonService) => {
    expect(service).toBeTruthy();
  }));
});
