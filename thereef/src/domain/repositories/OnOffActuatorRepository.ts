import { Observable } from "rxjs";
import { OnOffActuator } from "../models/OnOffActuator";

export interface OnOffActuatorRepositoryI {
  list: (params: OnOffActuatorFilter) => Observable<OnOffActuator[]>;
}

export interface OnOffActuatorFilter {
  values_amount?: number;
}
