import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReefButtonComponent } from './components/reef-button/reef-button.component';
import { ReefInputComponent } from './components/reef-input/reef-input.component';
import { LoginForm } from '../domain/repositories/UserRepository';
import { UserRepository } from '../infrastructure/repositories/UserRepository';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private userRepository: UserRepository, private toastr: ToastrService){}

  login() {
    this.userRepository.signIn(this.loginForm)
      .subscribe(
        (response) => {
        this.toastr.success('Bem vindo!', 'Você está logado');
        },
        error => {
          this.toastr.error('Ooops!', error.error.error_description[0]);
        }
    )
  }

  handleForm(field: keyof LoginForm, value: string) {
    this.loginForm[field] = value;
  }
}
