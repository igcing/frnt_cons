import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comuna } from '../dto/comuna';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { tap,map, filter } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ComunaService {
 

  http: HttpClient;
  constructor(http: HttpClient) { 
    this.http = http;
  }

  public getComunas() : Observable<Comuna[]>{
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.get<Comuna[]>(environment.urlComuna,{'headers' : headers,'responseType':'json'}).pipe(
     filter( x => x['id'] == null || x['id'] == "")
    );
  }
}
