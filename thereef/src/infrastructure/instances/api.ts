import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Http } from "../../domain/repositories/Http";

@Injectable({
  providedIn: 'root'
})
export class ApiService implements Http {
  constructor(private http: HttpClient){}

  get<T>(url: string) {
    return this.http.get<T>(url);
  }
}
