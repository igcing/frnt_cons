import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Farmacia } from '../dto/farmacia';
import { tap,map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FarmaciaService {

  http: HttpClient;
  constructor(http: HttpClient) { 
    this.http = http;
  }

  public getFarmacias(idComuna: string,  nombreLocal: string): Observable<Farmacia[]>{
      const headers = new HttpHeaders().set('content-type', 'application/json');
      console.log(idComuna);
      let url =environment.
                urlFarmacia.replace("$idComuna",idComuna.trim()).replace("$nombreLocal",nombreLocal);
    console.log(url);
      return this.http.get<Farmacia[]>(url,{'headers' : headers,'responseType':'json'}).pipe(
       //filter( x => x['id'] == null || x['id'] == "")
      );
    }

}
