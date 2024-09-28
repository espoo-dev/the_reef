import { Observable } from "rxjs";
import { Aquaria } from "../models/Aquaria";

export interface AquariaRepositoryI {
  list: () => Observable<Aquaria[]>;
}
