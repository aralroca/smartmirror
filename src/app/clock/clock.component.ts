import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'clock',
  template: ` <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-right"> 
                <span class="clock">{{time | date:'shortTime'}}</span>
              </div>`,
  styles: [`
  .clock{
    font-size: 7vmin;
    padding-right:20px;
  }`
  ]
})
export class ClockComponent implements OnInit {

  public time: Date;
  private timeInterval: any;

  constructor() { }

  ngOnInit() {
    const updateClock = () => this.time = new Date();

    updateClock();
    this.timeInterval = setInterval(updateClock, 10000); //every 10 seconds
  }

  ngOnDestroy() {
    clearInterval(this.timeInterval);
  }
}
