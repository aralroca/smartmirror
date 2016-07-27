import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Rx';

export interface IWindow extends Window {
  webkitSpeechRecognition: any;
}

@Injectable()
export class VoiceRecognitionService {

  constructor(private zone: NgZone) {
    /* void */
  }

  /**
   * Record
   * @param {string} language - Language of the voice recognition
   * @returns {Observable<string>} - Observable of voice converted to string 
   */
  record(language: string): Observable<string> {
    return Observable.create(observer => {
      const { webkitSpeechRecognition }: IWindow = <IWindow>window;
      const recognition = new webkitSpeechRecognition();

      recognition.onresult = (e) => this.zone.run(() => observer.next(e.results.item(e.results.length - 1).item(0).transcript.toLowerCase()));
      recognition.onerror = (e) => this.zone.run(() => observer.error(e));
      recognition.onend = () => this.zone.run(() => observer.complete());

      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = language;
      recognition.maxAlternatives = 1;
      recognition.start();
    });
  }
}
