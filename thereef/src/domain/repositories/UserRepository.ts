import { Observable } from "rxjs";
import { ResourceOwner, User } from "../models/User";

export interface UserRepositoryI {
  signIn: (body: LoginForm) => Observable<User>;
  info: () => Observable<ResourceOwner | null>
}

export interface LoginForm {
  email: string,
  password: string
}
