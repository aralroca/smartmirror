/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { AppComponent } from './app.component';
import { VoiceRecognitionService } from './voice-recognition.service';

beforeEachProviders(() => [AppComponent, VoiceRecognitionService]);

describe('App: SmartMirror', () => {
  it('should create the app',
      inject([AppComponent], (app: AppComponent) => {
    expect(app).toBeTruthy();
  }));
});
