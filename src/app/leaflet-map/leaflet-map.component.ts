import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

declare var L;

@Component({
  moduleId: module.id,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'leaflet-map',
  template: `
    <div id="leaflet-map" class="leaflet-map"></div>
  `,
  styles: [`
    .leaflet-map{
      width:100%;
      height:calc(80vh - 10px);
    }`
  ]
})
export class LeafletMapComponent implements OnInit {

  @Input('zoom') zoom: number;
  @Input('lat') lat: number;
  @Input('lng') lng: number;
  private mapTimeout: any;
  private map: any;

  constructor() {
    console.log(this.lat);
    console.log(this.lng);
    this.mapTimeout = setTimeout(() => {
      this.map = new L.Map('leaflet-map', {
        zoomControl: false,
        center: new L.LatLng(this.lat, this.lng),
        zoom: this.zoom,
        minZoom: 4,
        maxZoom: 19,
        layers: [new L.TileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.{ext}', {
          subdomains: 'abcd',
          minZoom: 0,
          maxZoom: 20,
          ext: 'png'
        })]
      });
    }, 200);
  }

  ngOnInit() {
  }

  ngOnChanges(e) {
    if (this.map) {
      this.map.setZoom(this.zoom);
      this.map.panTo(new L.LatLng(this.lat, this.lng));
    }
  }
}
