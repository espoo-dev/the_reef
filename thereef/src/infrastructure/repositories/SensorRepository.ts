import { Injectable } from "@angular/core";
import { Sensor } from "../../domain/models/Sensor";
import { SensorRepositoryI } from "../../domain/repositories/SensorRepository";
import { ApiService } from "../instances/api";

@Injectable({
  providedIn: 'root'
})
export class SensorRepository implements SensorRepositoryI {
  private path = '/sensors'
  constructor(private apiService: ApiService){}

  getSensors() {
    return this.apiService.get<Sensor>(this.path);
  };
}
