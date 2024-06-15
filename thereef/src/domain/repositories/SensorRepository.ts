import { Observable } from "rxjs";
import { Sensor } from "../models/Sensor";

export interface SensorRepositoryI {
  getSensors: () => Observable<Sensor[]>;
}
