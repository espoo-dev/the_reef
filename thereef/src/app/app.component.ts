import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReefButtonComponent } from './components/reef-button/reef-button.component';
import { ReefInputComponent } from './components/reef-input/reef-input.component';
import { LoginForm } from '../domain/repositories/UserRepository';
import { UserRepository } from '../infrastructure/repositories/UserRepository';

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
    email: '',
    password: ''
  };

  constructor(private userRepository: UserRepository){}

  login() {

    this.userRepository.signIn(this.loginForm)
      .subscribe((response) => {
        console.log('response -> ', response);
      })
  }

  handleForm(field: keyof LoginForm, value: string) {
    this.loginForm[field] = value;
  }
}
