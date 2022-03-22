import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  constructor(private http: HttpClient) { }

  
  public getPlaces(countryIds:string,namePrefix:string) :Observable<any>{
    return this.http.get(environment.baseURL+'?countryIds='+ countryIds+'&namePrefix='+namePrefix,{headers: {
      'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
      'x-rapidapi-key': '4ac5e3352fmshe6ac515ca3b8ccap1f0045jsnf0a504a87bbe'
    }});
  }

  public getCountryFlag(countryID: string){
    return this.http.get(environment.countryIdURL+countryID+'/flat'+'/64.png',{headers: {'Content-Type': '*',"Access-Control-Allow-Origin": "*","Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Headers": "'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'"}});
  }
}
