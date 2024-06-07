import { Observable } from "rxjs";

export interface Http {
  get: <T>(url: string) => Observable<T>;
  // post: <T>() => Observable<T>;
}
