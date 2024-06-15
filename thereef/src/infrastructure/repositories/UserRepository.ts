import { Injectable } from "@angular/core";
import { ApiService } from "../instances/api";
import { LoginForm, UserRepositoryI } from "../../domain/repositories/UserRepository";
import { ResourceOwner, User } from "../../domain/models/User";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserRepository implements UserRepositoryI {
  private path = 'users/'
  constructor(private apiService: ApiService){}

  signIn(body: LoginForm) {
    return this.apiService.post<User>(this.path + 'tokens/sign_in', body)
  };

  info(): Observable<ResourceOwner | null> {
    return this.apiService.get<ResourceOwner | null>(this.path + 'tokens/info')
  }
}
