import { Injectable } from "@angular/core";
import { ApiService } from "../instances/api";
import { Observable } from "rxjs";
import { RangeSensorFilter, RangeSensorRepositoryI } from "../../domain/repositories/RangeSensorRepository";
import { RangeSensor } from "../../domain/models/RangeSensor";

@Injectable({
  providedIn: 'root'
})
export class RangeSensorRepository implements RangeSensorRepositoryI {
  private path = 'api/v1/range_sensors'
  constructor(private apiService: ApiService){}

  list(params?: RangeSensorFilter): Observable<RangeSensor[]> {
    return this.apiService.get<RangeSensor[]>(this.path, params)
  }
}
