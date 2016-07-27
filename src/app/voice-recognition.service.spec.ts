/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { VoiceRecognitionService } from './voice-recognition.service';

describe('VoiceRecognition Service', () => {
  beforeEachProviders(() => [VoiceRecognitionService]);

  it('should exist',
    inject([VoiceRecognitionService], (service: VoiceRecognitionService) => {
      expect(service).toBeTruthy();
    }));
});
