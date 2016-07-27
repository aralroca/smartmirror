import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class MapService {

  constructor(private http: Http) { }

  searchLocation(location: string) {
    const uri = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyDKK7c-zKiQB2C7XaCSoOUTgXf-B7F7irI`;

    return this.http.get(uri)
      .map(response => {
        const res = response.json();

        return {
          'lat': res.results[0].geometry.location.lat,
          'lng': res.results[0].geometry.location.lng,
          'location': res.results[0].formatted_address
        }
      });
  }
}
