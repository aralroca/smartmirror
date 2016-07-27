import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class WeatherService {

  constructor(private http: Http) { }

  getWeather(lat: number, lng: number) {
    const uri = `https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&APPID=668c90201a44d04c13130251c595f627`;

    return this.http.get(uri)
      .map(response => response.json());
  }
}
