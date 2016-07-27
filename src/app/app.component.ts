import { Component, Inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { VoiceRecognitionService } from './voice-recognition.service';
import { MapService } from './map.service';
import { WeatherService } from './weather.service';
import { ClockComponent} from './clock';
import { DashboardComponent } from './dashboard';
import { LeafletMapComponent } from './leaflet-map';
import { WeatherComponent } from './weather';
import {CapitalizePipe} from './capitalize.pipe'


@Component({
  moduleId: module.id,
  selector: 'app-root',
  template: `<section [ngClass]="isAppOpen?'visible':'hidden'">
              <clock></clock>
              <dashboard>
                <h1 *ngIf="currentComponent===''" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 welcome text-center">
                {{sex === 'F'? 'Bienvenida':'Bienvenido'}}, {{name | capitalize}}
                </h1>
                <leaflet-map *ngIf="currentComponent==='map'" [lat]="lat" [lng]="lng" [zoom]="mapZoom"></leaflet-map>
                <weather *ngIf="currentComponent==='weather'" [weather]="weather"></weather>
              </dashboard>
             </section>`,
  pipes: [CapitalizePipe],
  providers: [VoiceRecognitionService, MapService, WeatherService],
  styles: [`
    .welcome{
        height: 80vh;
        padding-top:25vh;
        font-size: 14vmin;
    }

    .visible{
      -webkit-animation: fadein 2s; 
        -moz-animation: fadein 2s; 
          -ms-animation: fadein 2s; 
          -o-animation: fadein 2s; 
              animation: fadein 2s;
    }

    .hidden{
      -webkit-animation: fadeout 2s; 
        -moz-animation: fadeout 2s; 
          -ms-animation: fadeout 2s; 
          -o-animation: fadeout 2s; 
              animation: fadeout 2s;
    }

    @keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
    }

    /* Firefox < 16 */
    @-moz-keyframes fadein {
        from { opacity: 0; }
        to   { opacity: 1; }
    }

    /* Safari, Chrome and Opera > 12.1 */
    @-webkit-keyframes fadein {
        from { opacity: 0; }
        to   { opacity: 1; }
    }

    /* Internet Explorer */
    @-ms-keyframes fadein {
        from { opacity: 0; }
        to   { opacity: 1; }
    }

    /* Opera < 12.1 */
    @-o-keyframes fadein {
        from { opacity: 0; }
        to   { opacity: 1; }
    }
     @keyframes fadeout {
      from { opacity: 1; }
      to   { opacity: 0; }
    }

    /* Firefox < 16 */
    @-moz-keyframes fadeout {
        from { opacity: 1; }
        to   { opacity: 0; }
    }

    /* Safari, Chrome and Opera > 12.1 */
    @-webkit-keyframes fadeout {
        from { opacity: 1; }
        to   { opacity: 0; }
    }

    /* Internet Explorer */
    @-ms-keyframes fadeout {
        from { opacity: 1; }
        to   { opacity: 0; }
    }

    /* Opera < 12.1 */
    @-o-keyframes fadeout {
        from { opacity: 1; }
        to   { opacity: 0; }
    }
  `],
  directives: [ClockComponent, DashboardComponent, LeafletMapComponent, WeatherComponent]
})
export class AppComponent implements OnInit {

  public isAppOpen: boolean = false;
  public currentComponent: string = '';
  public mapZoom: number = 12;
  public name: string;
  public sex: string;
  public weather: any;
  public lat: number;
  public lng: number;

  constructor(private voiceRecognition: VoiceRecognitionService,
    private mapService: MapService,
    private weatherService: WeatherService) {
    this.name = localStorage.getItem('name') || 'Aral';
    this.sex = localStorage.getItem('sex') || 'M';
    this.initCoords();
  }

  private initCoords() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude || 41.3851;
        this.lng = position.coords.longitude || 41.3851;
      });
    } else {
      this.lat = 41.3851;
      this.lng = 2.1734;
    }
  }

  ngOnInit() {
    const close = () => {
      if (this.currentComponent) {
        this.currentComponent = '';
      } else {
        this.isAppOpen = false
      }
    }

    const resetMap = () => {
      this.mapZoom = 12;
      this.initCoords();
    }

    const getNumberFromSentence = sentence => parseInt(sentence.replace(/[^0-9]+/g, "")) || 1;

    const zoom = isZoomIn => sentence => {
      if (this.currentComponent === 'map') {
        const num = getNumberFromSentence(sentence);

        this.mapZoom = isZoomIn ? (num > 20 ? 20 : this.mapZoom + num) : (num < 0 ? 0 : this.mapZoom - num);
      }
    }

    const degreesToMove = (zoom, sentence) => 0.00025 * (12 - (zoom - 12)) * getNumberFromSentence(sentence);

    const goToMapLocation = (sentence) => {
      if (this.currentComponent === 'map') {
        const location: string = sentence.replace('ir a', '');

        this.mapService.searchLocation(location).subscribe((coords) => {
          this.lat = coords.lat;
          this.lng = coords.lng;
        });
      }
    };

    const getWeather = (sentence) => {
      const location: string = sentence.replace('tiempo', '');

      const getWeatherFromCoords = (coords) => {
        this.weatherService.getWeather(coords.lat, coords.lng).subscribe(weather => {
          weather.location = coords.location;
          console.log(weather);
          this.weather = weather;
          this.currentComponent = 'weather';
        })
      };

      this.mapService.searchLocation(location)
        .subscribe(getWeatherFromCoords);
    }

    const changeName = (sentence) => {
      this.name = sentence.replace('mi nombre es', '').trim();
      localStorage.setItem('name', this.name);
    };

    const setSex = sex => () => {
      this.sex = sex;
      localStorage.setItem('sex', this.sex);
    }

    const actions = {
      'abrir': () => this.isAppOpen = true,
      'cerrar': close,
      'tiempo': getWeather,
      'mapa': () => this.currentComponent = 'map',
      'reiniciar mapa': resetMap,
      'ir a': goToMapLocation,
      'ampliar': zoom(true),
      'reducir': zoom(false),
      'soy una chica': setSex('F'),
      'soy un chico': setSex('M'),
      'mi nombre es': changeName,
      'derecha': (sentence) => this.lng += degreesToMove(this.mapZoom, sentence),
      'izquierda': (sentence) => this.lng -= degreesToMove(this.mapZoom, sentence),
      'arriba': (sentence) => this.lat += degreesToMove(this.mapZoom, sentence),
      'abajo': (sentence) => this.lat -= degreesToMove(this.mapZoom, sentence),
      'menú': () => this.currentComponent = '',
    };

    const dispatchAction = (sentence: string) => {
      console.log(sentence);
      Object.keys(actions).forEach(action => {
        if (sentence.indexOf(action) > -1) {
          actions[action](sentence);
        }
      });
    };

    const record = () => setTimeout(() => this.voiceRecognition.record('es_ES').subscribe(dispatchAction, record, record), 200);
    record();
  }
}
