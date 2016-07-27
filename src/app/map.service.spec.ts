/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { MapService } from './map.service';

describe('Map Service', () => {
  beforeEachProviders(() => [MapService]);

  it('should ...',
      inject([MapService], (service: MapService) => {
    expect(service).toBeTruthy();
  }));
});
