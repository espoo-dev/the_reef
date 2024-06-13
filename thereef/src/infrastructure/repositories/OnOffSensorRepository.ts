import { Injectable } from "@angular/core";
import { OnOffSensorFilter, OnOffSensorRepositoryI } from "../../domain/repositories/OnOffSensorRepository";
import { ApiService } from "../instances/api";
import { Observable } from "rxjs";
import { OnOffSensor } from "../../domain/models/OnOffSensor";

@Injectable({
  providedIn: 'root'
})
export class OnOffSensorRepository implements OnOffSensorRepositoryI {
  private path = 'api/v1/on_off_sensors'
  constructor(private apiService: ApiService){}

  list(params?: OnOffSensorFilter): Observable<OnOffSensor[]> {
    return this.apiService.get<OnOffSensor[]>(this.path, params)
  }
}
