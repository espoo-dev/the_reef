import { Injectable } from "@angular/core";
import { LoginForm } from "../domain/repositories/UserRepository";
import { ToastrService } from "ngx-toastr";
import { UserRepository } from "../infrastructure/repositories/UserRepository";
import { Observable, catchError, map, of, tap } from "rxjs";
import { User } from "../domain/models/User";
import { Router } from "@angular/router";

export interface IAuthService {
  login: (body: LoginForm) => Observable<User | null>;
  setSession: (token: string) => void;
  getToken: () => string | null;
  logout: () => void;
  isLoggedIn: () => Observable<boolean>;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService implements IAuthService {
  private tokenKey: string = 'token';

  constructor(
    private userRepository: UserRepository,
    private toastr: ToastrService,
    private router: Router
  ) {}

  login(loginForm: LoginForm): Observable<User | null> {
    return this.userRepository.signIn(loginForm).pipe(
      tap((response: User) => {
        this.toastr.success('Bem vindo!');
        this.setSession(response.token);
        this.router.navigate(['/home']);
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

  isLoggedIn(): Observable<boolean> {
    if (!this.getToken()) {
      return of(false);
    }

    return this.userRepository.info().pipe(
      map(() => true),
      catchError(() => of(false))
    )
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
