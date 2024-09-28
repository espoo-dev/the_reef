import { Observable } from "rxjs";
import { Aquaria } from "../../domain/models/Aquaria";
import { AquariaRepositoryI } from "../../domain/repositories/AquariaRepository";
import { ApiService } from "../instances/api";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AquariaRepository implements AquariaRepositoryI {
  private path = 'api/client/v1/aquaria/';
  constructor(private apiService: ApiService){}

  list(): Observable<Aquaria[]> {
    return this.apiService.get<Aquaria[]>(this.path)
  }
}
