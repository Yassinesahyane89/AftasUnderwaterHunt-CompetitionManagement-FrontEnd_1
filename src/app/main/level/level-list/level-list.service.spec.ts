import { TestBed } from '@angular/core/testing';

import { LevelListService } from './level-list.service';

describe('LevelListService', () => {
  let service: LevelListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LevelListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
