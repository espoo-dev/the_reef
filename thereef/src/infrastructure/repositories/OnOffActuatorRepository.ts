import { Injectable } from "@angular/core";
import { OnOffActuatorFilter, OnOffActuatorRepositoryI } from "../../domain/repositories/OnOffActuatorRepository";
import { ApiService } from "../instances/api";
import { Observable } from "rxjs";
import { OnOffActuator } from "../../domain/models/OnOffActuator";

@Injectable({
  providedIn: 'root'
})
export class OnOffActuatorRepository implements OnOffActuatorRepositoryI {
  private path = 'api/v1/on_off_actuators'
  constructor(private apiService: ApiService){}

  list(params?: OnOffActuatorFilter): Observable<OnOffActuator[]> {
    return this.apiService.get<OnOffActuator[]>(this.path, params)
  }
}
