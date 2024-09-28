import { Observable } from "rxjs";
import { OnOffSensor } from "../models/OnOffSensor";

export interface OnOffSensorRepositoryI {
  list: (params: OnOffSensorFilter) => Observable<OnOffSensor[]>;
}

export interface OnOffSensorFilter {
  values_amount?: number;
}
