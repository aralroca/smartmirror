import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  moduleId: module.id,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'weather',
  template: `
    <div class="weather col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
      <h1 class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
           {{weather.location}}  
      </h1>
    
      <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 text-right">
        <div>{{weather.main.temp+' ºC'}}</div>
      </div>

      <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 text-left">
           <img [src]="'img/weatherIcons/'+weather.weather[0].icon+'.png'" class="img-responsive" />
      </div>
    </div>
  `,
  styles: [`
  .weather{
    margin-top:25vh;
    font-size: 8vmin;
  }
  .weather h1{
    margin-bottom: 15px;
  }
  `]
})
export class WeatherComponent implements OnInit {

  @Input('weather') weather:any;
  constructor() {}

  ngOnInit() {
  }

}
