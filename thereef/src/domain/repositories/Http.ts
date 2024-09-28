import { Observable } from "rxjs";

export interface Http {
  get: <T>(url: string, params?: any) => Observable<T>;
  post: <T>(url: string, body: any) => Observable<T>;
}
