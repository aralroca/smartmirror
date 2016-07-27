import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'dashboard',
  template: `
  <section class="col-lg-12 col-md-12 col-sm-12 col-xs-12 dashboard-wrapper">
    <div class="dashboard">
         <ng-content></ng-content>
    </div>
  </section>
  `,
  styles: [`
    .dashboard-wrapper{
      padding: 0 30px 0 30px;
    }
    .dashboard{
      height: 80vh;
      width: 100%;
      border-radius:10px;
      border: 5px solid white;
    }
  `]
})
export class DashboardComponent {}
