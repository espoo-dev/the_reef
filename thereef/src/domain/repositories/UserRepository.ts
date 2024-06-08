import { Observable } from "rxjs";
import { User } from "../models/User";

export interface UserRepositoryI {
  signIn: (body: LoginForm) => Observable<User>;
}

export interface LoginForm {
  email: string,
  password: string
}
