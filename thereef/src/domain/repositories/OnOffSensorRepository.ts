import { Observable } from "rxjs";
import { OnOffActuator } from "../models/OnOffSensor";

export interface OnOffSensorRepositoryI {
  list: (params: OnOffSensorFilter) => Observable<OnOffActuator[]>;
}

export interface OnOffSensorFilter {
  values_amount?: number;
}
