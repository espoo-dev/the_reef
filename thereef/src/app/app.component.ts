import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReefButtonComponent } from './components/reef-button/reef-button.component';
import { ReefInputComponent } from './components/reef-input/reef-input.component';
import { LoginForm } from '../domain/repositories/UserRepository';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReefButtonComponent, ReefInputComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'thereef';
  loginForm: LoginForm = {
    email: 'admin@email.com',
    password: 'password'
  };

  loadingLogin = false;

  constructor(private authService: AuthService){}

  login() {
    this.loadingLogin = true;
    this.authService.login(this.loginForm)
      .subscribe(_ => {
        this.loadingLogin = false;
      })
  }

  handleForm(field: keyof LoginForm, value: string) {
    this.loginForm[field] = value;
  }
}
