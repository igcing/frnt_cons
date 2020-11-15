import { AfterViewInit, Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import * as mapboxgl from 'mapbox-gl';
import {environment} from '../../environments/environment';
import { Comuna } from '../dto/comuna';
import { ComunaService } from '../services/comuna.service';

import { FarmaciaService } from '../services/farmacia.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})



export class MapComponent implements OnInit{
  
  maps: mapboxgl.Map[];
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  // lat = 45.899977;
  // lng = 6.172652;
  lat = '';
  lng = '';
  zoom = 18;
   nombre_farmacia = "XXXX";
   comuna_farmacia = "XX";
   formSearch: FormGroup;
   formFounded: FormGroup;

   EXPRDECIMAL:string = "^(-)?\d{1,2}(\.\d{1,9})?$"; //REVISAR***
   comunaService: ComunaService;
   farmaciaService: FarmaciaService;
   comunas: any;
   farmacias:any;
  constructor( formBuilder: FormBuilder, comunaService: ComunaService, farmaciaService: FarmaciaService) { 
    this.comunaService = comunaService;
    this.farmaciaService = farmaciaService;
    mapboxgl.accessToken = environment.mapbox.accessToken;
    this.formSearch =  new FormGroup({
      comuna : new FormControl(''),
      nombreLocal: new FormControl('',[Validators.required]),
      latitud : new FormControl('', [Validators.required /*,Validators.pattern(this.EXPRDECIMAL)*/,Validators.maxLength(10)]),
      longitud : new FormControl('', [Validators.required /*, /*Validators.pattern(this.EXPRDECIMAL)*/,Validators.maxLength(10)]),
    });

    this.formFounded =  new FormGroup({
      latitud : new FormControl(''),
      longitud : new FormControl(''),
    });
  }
 
  

  search(){
    // console.log(this.formGroup.get('latitud').value , this.formGroup.get('longitud').value);
    // this.lng = this.formGroup.get('longitud').value;
    // this.lat = this.formGroup.get('latitud').value;
    // this.buildMap();
    console.log(+'idComuna:' +this.formSearch.get('comuna').value +'-local:' + this.formSearch.get('nombreLocal').value );

   this.farmaciaService.getFarmacias(this.formSearch.get('comuna').value, this.formSearch.get('nombreLocal').value)
    .subscribe(farmacias => {
      this.farmacias = farmacias; 
      console.log(this.farmacias);
    });
  }

  ngOnInit(): void {
  //  this.buildMap();
    this.getComunas();
  }

  getComunas() : void{
    this.comunaService.getComunas().subscribe(comunas => {
      this.comunas = comunas;
    });
  }
  
  verMapa(latitud: string, longitud: string):void{
    console.log('vermapa - ' +longitud + '/' +latitud );
    this.buildMap(longitud,latitud);
  }
  
  buildMap(latitud: string , longitud: string) {
    let idMap = 'map'+longitud+latitud;
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
