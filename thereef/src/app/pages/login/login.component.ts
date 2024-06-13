import { Component } from '@angular/core';
import { LoginForm } from '../../../domain/repositories/UserRepository';
import { AuthService } from '../../../services/auth.service';
import { ReefInputComponent } from '../../components/reef-input/reef-input.component';
import { ReefButtonComponent } from '../../components/reef-button/reef-button.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReefButtonComponent, ReefInputComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  title = 'thereef';
  loginForm: LoginForm = {
    email: 'edimo@email.com',
    password: 'edimo@email.com'
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
