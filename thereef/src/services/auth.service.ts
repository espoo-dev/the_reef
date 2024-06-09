import { Injectable } from "@angular/core";
import { LoginForm } from "../domain/repositories/UserRepository";
import { ToastrService } from "ngx-toastr";
import { UserRepository } from "../infrastructure/repositories/UserRepository";
import { Observable, catchError, of, tap } from "rxjs";
import { User } from "../domain/models/User";

export interface IAuthService {
  login: (body: LoginForm) => Observable<User | null>;
  setSession: (token: string) => void;
  getToken: () => string | null;
  logout: () => void;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService implements IAuthService {
  private tokenKey: string = 'token';

  constructor(
    private userRepository: UserRepository,
    private toastr: ToastrService
  ) {}

  login(loginForm: LoginForm): Observable<User | null> {
    return this.userRepository.signIn(loginForm).pipe(
      tap((response: User) => {
        this.toastr.success('Bem vindo!');
        this.setSession(response.token);
      }),
      catchError((error: any) => {
        this.toastr.error('Oops!', error.error.error_description[0]);
        return of(null);
      })
    )
  }

  setSession(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
