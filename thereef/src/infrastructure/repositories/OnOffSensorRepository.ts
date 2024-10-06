import { Injectable } from "@angular/core";
import { OnOffSensorFilter, OnOffSensorRepositoryI } from "../../domain/repositories/OnOffSensorRepository";
import { ApiService } from "../instances/api";
import { Observable } from "rxjs";
import { OnOffActuator } from "../../domain/models/OnOffSensor";

@Injectable({
  providedIn: 'root'
})
export class OnOffSensorRepository implements OnOffSensorRepositoryI {
  private path = 'api/client/v1/on_off_sensors'
  constructor(private apiService: ApiService){}

  list(params?: OnOffSensorFilter): Observable<OnOffActuator[]> {
    return this.apiService.get<OnOffActuator[]>(this.path, params)
  }
}
