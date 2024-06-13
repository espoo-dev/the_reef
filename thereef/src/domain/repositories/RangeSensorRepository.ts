import { Observable } from "rxjs";
import { RangeSensor } from "../models/RangeSensor";

export interface RangeSensorRepositoryI {
  list: (params: RangeSensorFilter) => Observable<RangeSensor[]>;
}

export interface RangeSensorFilter {
  values_amount?: number;
}
