import {Component, OnInit} from '@angular/core';
import * as mapboxgl from "mapbox-gl";
import * as MapboxDraw from '@mapbox/mapbox-gl-draw';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  map!: mapboxgl.Map;
  draw: any;

  constructor() {
    this.draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: false,
        trash: false
      },
      // defaultMode: 'draw_polygon'
    });
  }

  ngOnInit() :void {
    (mapboxgl as typeof mapboxgl).accessToken = 'pk.eyJ1IjoibWFyb29uZWRpb25lIiwiYSI6ImNqdmp0MzB1azBpcDAzem1naHZwMjNndGIifQ.65nvvRg9QeFUV2c6b9W4Vw';
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [ 37.63188011767531, 55.75346278121029],
      zoom: 9,
    });
    this.map.addControl(this.draw);

    this.map.on('load', () => {
      // Add a new vector tile source with ID 'mapillary'.
      this.map.addSource('mapillary', {
        'type': 'vector',
        'tiles': [
          'https://tiles.mapillary.com/maps/vtp/mly1_public/2/{z}/{x}/{y}?access_token=MLY|4142433049200173|72206abe5035850d6743b23a49c41333'
        ],
        'minzoom': 6,
        'maxzoom': 14
      });
      this.map.addLayer(
        {
          'id': 'mapillary', // Layer ID
          'type': 'line',
          'source': 'mapillary', // ID of the tile source created above
          // Source has several layers. We visualize the one with name 'sequence'.
          'source-layer': 'sequence',
          'layout': {
            'line-cap': 'round',
            'line-join': 'round'
          },
          'paint': {
            'line-opacity': 0.6,
            'line-color': 'rgb(53, 175, 109)',
            'line-width': 2
          }
        },
        'road-label-simple' // Arrange our new layer beneath labels and above roads
      );
    });

    this.map.addControl(new mapboxgl.NavigationControl());
  }


  drawPolygon() {
    this.draw.changeMode('draw_polygon');
  }

  drawPoint() {
    this.draw.changeMode('draw_point');
  }

  drawLine() {
    this.draw.changeMode('draw_line_string');
  }

  drawDeleteAll() {
    this.draw.deleteAll();
  }

  satellite() {

    this.map.setStyle('mapbox://styles/mapbox/satellite-streets-v12');
  }

  light() {
    this.map.setStyle('mapbox://styles/mapbox/light-v11');
  }

  dark() {
    this.map.setStyle('mapbox://styles/mapbox/dark-v11');
  }

  streets() {
    this.map.setStyle('mapbox://styles/mapbox/streets-v12');
  }

}
