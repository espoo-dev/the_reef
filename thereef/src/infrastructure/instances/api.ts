import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Http } from "../../domain/repositories/Http";
import { environment } from "../../environments/environment";
import { OnOffSensorFilter } from "../../domain/repositories/OnOffSensorRepository";

@Injectable({
  providedIn: 'root'
})
export class ApiService implements Http {
  private apiBaseUrl = environment.apiUrl;
  constructor(private http: HttpClient){}

  get<T>(url: string, params?: any) {
    return this.http.get<T>(this.apiBaseUrl + url, { params: params });
  }

  post<T>(url: string, body: any) {
    return this.http.post<T>(this.apiBaseUrl + url, body);
  }
}
