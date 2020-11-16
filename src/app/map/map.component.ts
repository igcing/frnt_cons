import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../environments/environment';
import { ComunaService } from '../services/comuna.service';
import { FarmaciaService } from '../services/farmacia.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})



export class MapComponent implements OnInit {
  isSearching: boolean = false;
  maps: mapboxgl.Map[];
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  zoom = 18;
  formSearch: FormGroup;
  comunaService: ComunaService;
  farmaciaService: FarmaciaService;
  comunas: any = [];
  farmacias: any = [];
  constructor(comunaService: ComunaService, farmaciaService: FarmaciaService) {
    this.comunaService = comunaService;
    this.farmaciaService = farmaciaService;
    mapboxgl.accessToken = environment.mapbox.accessToken;
    this.formSearch = new FormGroup({
      comuna: new FormControl(''),
      nombreLocal: new FormControl('', [Validators.required])
    });
  }


  /**
   * Evento para buscar farmacias por filter
   */
  search() {
    this.isSearching = true;
    console.log(+'idComuna:' + this.formSearch.get('comuna').value + '-local:' + this.formSearch.get('nombreLocal').value);

    this.farmaciaService.getFarmacias(this.formSearch.get('comuna').value, this.formSearch.get('nombreLocal').value)
      .subscribe(farmacias => {
        this.farmacias = farmacias;
        console.log(this.farmacias);
        this.isSearching = false;
      });
  }

  ngOnInit(): void {
    this.getComunas();
  }

  /**
   * Método para obtener las comunas
   */
  getComunas(): void {
    this.comunaService.getComunas().subscribe(comunas => {
      this.comunas = comunas;
    });
  }

  /**
   * Event para crear/mostrar mapa por latitud/longitud
   * @param latitud
   * @param longitud 
   */
  verMapa(latitud: string, longitud: string): void {
    console.log('vermapa - ' + longitud + '/' + latitud);
    this.buildMap(longitud, latitud);
  }

  /**
   * Creador de mapa con marcador al centro
   * @param latitud
   * @param longitud 
   */
  buildMap(latitud: string, longitud: string) {
    let idMap = 'map' + longitud + latitud;
    console.log(idMap);
    this.map = new mapboxgl.Map({
      container: idMap,
      style: this.style,
      zoom: this.zoom,
      center: [longitud, latitud]
    })
    let marker = new mapboxgl.Marker()
      .setLngLat([longitud, latitud])
      .addTo(this.map);

    this.map.addControl(new mapboxgl.NavigationControl());
  }


}
