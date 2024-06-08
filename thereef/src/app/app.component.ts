import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SensorRepository } from '../infrastructure/repositories/SensorRepository';
import { Sensor } from '../domain/models/Sensor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'thereef';
  sensorList: Sensor[] = [];

  constructor(private sensorRepository: SensorRepository){}

  ngOnInit(){
    this.sensorRepository.getSensors()
      .subscribe((response) => {
        console.log('response -> ', response);
      })
  }
}
