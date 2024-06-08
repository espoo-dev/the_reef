import { Injectable } from "@angular/core";
import { ApiService } from "../instances/api";
import { LoginForm, UserRepositoryI } from "../../domain/repositories/UserRepository";
import { User } from "../../domain/models/User";

@Injectable({
  providedIn: 'root'
})
export class UserRepository implements UserRepositoryI {
  private path = 'users/'
  constructor(private apiService: ApiService){}

  signIn(body: LoginForm) {
    return this.apiService.post<User>(this.path + 'tokens/sign_in', body)
  };
}
