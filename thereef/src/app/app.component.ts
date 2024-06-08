import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SensorRepository } from '../infrastructure/repositories/SensorRepository';
import { Sensor } from '../domain/models/Sensor';
import { ReefButtonComponent } from './components/reef-button/reef-button.component';
import { ReefInputComponent } from './components/reef-input/reef-input.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReefButtonComponent, ReefInputComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'thereef';
  sensorList: Sensor[] = [];

  constructor(private sensorRepository: SensorRepository){}

  login() {
    console.log('login -> ');
  }

  handleForm(field: string, value: string) {
    console.log('value -> ', value);
  }

  ngOnInit(){
    this.sensorRepository.getSensors()
      .subscribe((response) => {
        console.log('response -> ', response);
      })
  }
}
